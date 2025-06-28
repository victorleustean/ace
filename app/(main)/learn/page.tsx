import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const LearnPage = async () => {
  const { userId } = await auth();
  
  console.log("LearnPage - userId:", userId);
  
  if (!userId) {
    console.log("No userId, redirecting to home");
    redirect("/");
  }

  try {
    const userProgress = await getUserProgress(userId);
    console.log("User progress loaded:", !!userProgress, "Active course:", !!userProgress?.activeCourse);

    if (!userProgress || !userProgress.activeCourse) {
      console.log("No user progress or active course, redirecting to courses");
      redirect("/courses");
    }

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
          <Header title={userProgress.activeCourse.title} />
          <FeedWrapper>
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4">
                Bun venit la {userProgress.activeCourse.title}!
              </h2>
              <p className="text-muted-foreground">
                Cursul tău este pregătit. Să începem să învățăm!
              </p>
            </div>
          </FeedWrapper>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in LearnPage:", error);
    redirect("/courses");
  }
};

export default LearnPage;