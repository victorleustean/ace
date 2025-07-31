
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const StorePage = async () => {
    const { userId } = await auth();

    // If not authenticated, redirect to home
    if (!userId) {
        redirect("/");
    }

    const userProgressData = getUserProgress(userId);
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
        return null;
    }

    const isPro = !!userSubscription?.isActive;
      
    return (
        <>
            {/* Mobile Header - contains the green bar and hamburger menu */}
            <MobileHeader />
            
            <div className="flex flex-row-reverse gap-[48px] px-6 lg:ml-[256px] pt-[50px] lg:pt-0">
                {/* Desktop Sidebar - only visible on lg screens */}
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                
                <StickyWrapper>
                    <UserProgress 
                        activeCourse={userProgress.activeCourse}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={isPro}
                    />
                    {!(!!userSubscription?.isActive) && (
                        <Promo /> 
                    )}
                    <Quests points={userProgress.points}/>
                </StickyWrapper>
                
                <div className="flex-1 max-w-4xl">
                    <div className="w-full flex flex-col items-center pt-6">
                        <Image
                            src="/store.png"
                            alt="Shop"
                            height={120}
                            width={120}
                        />
                        <h1 className="text-center font-bold text-neutral-800 text-3xl my-8">
                            Shop
                        </h1>
                        <p className="text-muted-foreground text-center text-xl mb-8">
                            Spend your points on cool stuff!
                        </p>
                        <Items
                            hearts={userProgress.hearts}
                            points={userProgress.points}
                            hasActiveSubscription={isPro} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StorePage;