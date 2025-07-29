import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { userProgress, courses, units, lessons, challenges, challengeProgress, challengeOptions, UserSubscription } from "@/db/schema";
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
  const currentUserProgress = await getUserProgress(userId);

  if (!userId || !currentUserProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, currentUserProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
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
      // If lesson has no challenges, it's considered incomplete/locked unless it's the first lesson
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false, hasContent: false };
      }
      
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
          && challenge.challengeProgress.length > 0
          && challenge.challengeProgress.every((progress) => progress.completed);
      });
      
      return { ...lesson, completed: allCompletedChallenges, hasContent: true };
    });

    // Find the first uncompleted lesson to mark as active
    let activeFound = false;
    const lessonsWithActiveStatus = lessonsWithCompletedStatus.map((lesson) => {
      if (!lesson.completed && !activeFound && lesson.hasContent) {
        activeFound = true;
        return { ...lesson, isActive: true };
      }
      return { ...lesson, isActive: false };
    });

    // If no lesson with content is found as active, make the first lesson with content active
    if (!activeFound) {
      const firstLessonWithContent = lessonsWithActiveStatus.find(lesson => lesson.hasContent);
      if (firstLessonWithContent) {
        firstLessonWithContent.isActive = true;
      }
    }

    return { ...unit, lessons: lessonsWithActiveStatus };
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
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
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

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      // Only consider lessons that have challenges (have content)
      if (!lesson.challenges || !Array.isArray(lesson.challenges) || lesson.challenges.length === 0) {
        return false;
      }
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some((progress) => progress.completed === false)
        );
      });
    });

  // If no uncompleted lesson found, get the first lesson with content
  const activeLesson = firstUncompletedLesson || unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => lesson.challenges && lesson.challenges.length > 0);

  return {
    activeLesson: activeLesson,
    activeLessonId: activeLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  const courseProgress = await getCourseProgress();
  
  if (!userId) {
    console.log("getLesson: No userId");
    return null;
  }

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    console.log("getLesson: No lessonId");
    return null;
  }

  console.log("getLesson: Fetching lesson with ID:", lessonId);

  try {
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      with: { 
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            challengeOptions: true, // This should fetch the challenge options
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    });
    
    if (!data || !data.challenges) {
      console.log("getLesson: No data or challenges found");
      return null;
    }

    console.log("getLesson: Raw data from database:", JSON.stringify(data, null, 2));

    const normalizedChallenges = data.challenges.map((challenge) => {
      const completed = challenge.challengeProgress && 
        challenge.challengeProgress.length > 0 && 
        challenge.challengeProgress.every((progress) => progress.completed);

      console.log(`Challenge ${challenge.id}:`, {
        id: challenge.id,
        type: challenge.type,
        question: challenge.question,
        challengeOptions: challenge.challengeOptions,
        optionsCount: challenge.challengeOptions?.length || 0,
        completed
      });

      // Map challengeOptions to challengesOptions for compatibility with Quiz component
      return { 
        ...challenge, 
        completed,
        challengesOptions: challenge.challengeOptions || [] // Ensure it's always an array
      };
    });
    
    console.log("getLesson: Normalized challenges:", JSON.stringify(normalizedChallenges, null, 2));
    
    return { ...data, challenges: normalizedChallenges };
    
  } catch (error) {
    console.error("getLesson: Database error:", error);
    return null;
  }
});

export const getLessonPercentage = cache(async (userId?: string) => {
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

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
  const { userId } = await auth();
  
  if (!userId) return null;

  const data = await db.query.UserSubscription.findFirst({
    where: eq(UserSubscription.userId, userId),
  });

  if (!data) return null;

  const isActive = 
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});