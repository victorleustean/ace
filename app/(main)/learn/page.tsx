import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUnits } from "@/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Unit } from "./unit";

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

  const units = await getUnits(userId); // Pass userId here

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>

      <div className="flex-1 flex flex-col">
        <FeedWrapper>
          <Header title={userProgress.activeCourse.title} />
          {units.map((unit: any) => (
            <div key={unit.id} className="mb-10">
              <h2 className="text-lg font-bold mb-4">{unit.title}</h2>
              < Unit 
              id={unit.id}
              order={unit.order}
              description={unit.Description}
              tittle={unit.table}
              lessons={unit.lessons}
              activeLesson={undefined}
              activeLessonPercentage={0}
              />
            </div>
          ))}
        </FeedWrapper>
      </div>
    </div>
  );
};

export default LearnPage;