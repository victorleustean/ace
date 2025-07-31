import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getLessonPercentage, getUnits, getCourseProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema"
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";



const LearnPage = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    console.log("No userId, redirecting to home");
    redirect("/");
  }
  
  const userProgress = await getUserProgress(userId);
  if (!userProgress || !userProgress.activeCourse) {
    console.log("No user progress or active course, redirecting to courses");
    redirect("/courses");
  }
  
  const courseProgress = await getCourseProgress();
  if (!courseProgress) {
    redirect("/courses");
  }
  
  const lessonPercentage = await getLessonPercentage(userId);
  const units = await getUnits(userId);
  const userSubscription = await getUserSubscription();
  
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!(!!userSubscription?.isActive) && (
        <Promo /> 
        )}
        <Quests points={userProgress.points}/>
      </StickyWrapper>
      
      <div className="flex-1 flex flex-col">
        <FeedWrapper>
          <Header title={userProgress.activeCourse.title} />
          {units.map((unit) => (
            <div key={unit.id} className="mb-10">
              <Unit 
                id={unit.id}
                order={unit.order}
                description={unit.description ?? ""}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                  unit: typeof unitsSchema.$inferSelect;
                } | undefined}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))}
        </FeedWrapper>
      </div>
    </div>
  );
};

export default LearnPage;