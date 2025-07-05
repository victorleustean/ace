import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { userProgress, courses, units, lessons, challenges, challengeProgress, challengeOptions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";


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



export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgressData = await getUserProgress(userId);

  if (!userId || !userProgressData?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgressData.activeCourseId),
    with: {
      lessons: {
        unit: true,
        challenges: {
          with: {
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    },
  });

 const firstUncompletedLesson = unitsInActiveCourse
  .flatMap((unit) => unit.lessons)
  .find((lesson) => {
    // Fix: check if lesson.challenges exists and is an array
    if (!lesson.challenges || !Array.isArray(lesson.challenges)) return false;
    return lesson.challenges.some((challenge) => {
      return (
        !challenge.challengeProgress ||
        challenge.challengeProgress.length === 0 ||
        challenge.challengeProgress.some((progress) => progress.completed === false)
      );
    });
  });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  const courseProgress = await getCourseProgress();
  if (!userId) {
    return null;
  }

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: { 
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });
  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)

    return { ...challenge, completed };
  })
  return { ...data, challenges: normalizedChallenges }
});


export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges
    .filter((challenge) => challenge.completed);
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );
  
  return percentage;
});