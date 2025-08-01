import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {  getUserProgress, getUserSubscription } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Progress } from "@/components/ui/progress";
import { quests } from "@/constants";
import { Promo } from "@/components/promo";

const QuestsPage = async () => {
    const { userId } = await auth();

    // If not authenticated, redirect to home
    if (!userId) {
        redirect("/");
    }

    const userProgressData = getUserProgress(userId);
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription, ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
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
                </StickyWrapper>
                
                <div className="flex-1">
                    <div className="w-full flex flex-col items-center pt-6">
                        <Image
                            src="/target.png"
                            alt="Quests"
                            height={90}
                            width={90}
                        />
                        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                            Obiectivele mele
                        </h1>
                        <p className="text-muted-foreground text-center text-lg mb-6">  
                          Completează misiuni folosind punctele XP.
                        </p>
                        <ul className="w-full">
                            {quests.map((quest) => {
                                const progress = (userProgress.points / quest.value) * 100;
                                return (
                                    <div className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                    key={quest.title}>
                                        <Image 
                                        src="/diamond.png"
                                        alt="Points"
                                        width={60}
                                        height={60}/>
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <p className="text-neutral-700 text-xl font-bold">
                                                    {quest.title}
                                            </p>
                                            <Progress 
                                            value={progress} className="h-3"/>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestsPage;