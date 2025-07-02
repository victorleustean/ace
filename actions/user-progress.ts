"use server";

import { auth, currentUser } from "@clerk/nextjs/server"; 
import { getCourseById, getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        console.log("Auth check - userId:", userId, "user exists:", !!user);

        if (!userId || !user) {
            console.error("Authentication failed - no userId or user");
            throw new Error("Utilizatorul nu este autentificat");
        }

        const course = await getCourseById(courseId);
        console.log("Course found:", !!course, "courseId:", courseId);

        if (!course) {
            throw new Error("Cursul nu a fost găsit");
        }

     

        // Check existing user progress
        const existingUserProgress = await getUserProgress(userId);
        console.log("Existing user progress:", !!existingUserProgress);

        if (existingUserProgress) {
            console.log("Updating existing user progress");
            await db.update(userProgress).set({
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/logosaas.png"
            }).where(eq(userProgress.userId, userId));
        } else {
            console.log("Creating new user progress");
            await db.insert(userProgress).values({
                userId,
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/logosaas.png",
            });
        }

        // Clear cache and revalidate paths
        revalidatePath("/courses");
        revalidatePath("/learn");
        revalidatePath("/");

        console.log("User progress updated successfully, redirecting to /learn");
        
    } catch (error) {
        console.error("Error in upsertUserProgress:", error);
        throw error;
    }
    
    redirect("/learn");
};