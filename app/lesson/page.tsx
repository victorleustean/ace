import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Quiz } from "./quiz"

const LessonPage = async () => {
    const { userId } = await auth();
    
    if (!userId) {
        redirect("/learn");
    }
    
    const lessonData = getLesson();
    const userProgressData = getUserProgress(userId);
    const userSubscriptionData = getUserSubscription();
    
    const [lesson, userProgress, userSubscription] = await Promise.all([
        lessonData, 
        userProgressData,
        userSubscriptionData
    ]);
    
    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100;
    
    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userSubscription}
        />
    );
};

export default LessonPage;