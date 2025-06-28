"use server";

import { auth, currentUser } from "@clerk/nextjs/server"; 
import { getCourseById, getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = auth();
    const user = await currentUser();

    // DEBUG: vezi ce valori ai aici
    console.log("userId:", userId, "user:", user);

    if (!userId || !user) {
        throw new Error("Acțiunea nu este autorizată");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Cursul nu a fost găsit");
    }

    const existingUserProgress = await getUserProgress(userId);

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/logosaas.png"
        }).where(userProgress.userId.eq(userId));
    } else {
        await db.insert(userProgress).values({
            userId,
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/logosaas.png",
        });
    }

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};