import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
          activeCourse={{ title: "Educație financiară", imageSrc: "/educatie_financiara.jpg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>

      <div className="flex-1 flex flex-col">
        <Header title="Educație Financiară" />
        <FeedWrapper />
      </div>
    </div>
  );
};

export default LearnPage;