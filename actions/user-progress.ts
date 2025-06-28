"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { getCourseById, getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = auth(); // <-- no await here
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Acțiunea nu este autorizată");
    }
    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Cursul nu a fost găsit");
        // TODO: Enable once units and lessons are added
        // if (!course.units.length || !course.units[0].lessons.length) {
        //   throw new Error ("Cursul este gol");
        // }
    }
    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/logosaas.png"
        });
        revalidatePath("/courses");
        revalidatePath("/learn")
        redirect("/learn")
    }

    await db.insert(userProgress).values({
        userId,
        activeeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/logosaas.png",
    })

    revalidatePath("/courses");
    revalidatePath("/learn")
    redirect("/learn")
};



