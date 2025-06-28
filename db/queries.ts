import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { userProgress, courses } from "@/db/schema";


export const getCourses = cache(async () => {
  return await db.query.courses.findMany();
});

export const getCourseById = cache(async (courseId: number) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });
});

export const getUserProgress = cache(async (userId: string) => {
  if (!userId) return null;

  return await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
});