 import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { userProgress, courses, units, challengeProgress } from "@/db/schema";

export const getCourses = cache(async () => {
  return await db.query.courses.findMany();
});

export const getCourseById = cache(async (courseId: number) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });
});

export const getUnits = cache(async (userId: string) => {
  // Removed: const { userId } = await auth();
  const currentUserProgress = await getUserProgress(userId);

  if (!userId || !currentUserProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, currentUserProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
          && challenge.challengeProgress.length > 0
          && challenge.challengeProgress.every((progress) => progress.completed);
      });
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

export const getUserProgress = cache(async (userId?: string) => {
  if (!userId) return null;

  return await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
});