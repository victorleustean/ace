import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const LeaderboardPage = async () => {
    const { userId } = await auth();

    // If not authenticated, redirect to home
    if (!userId) {
        redirect("/");
    }

    const userProgressData = getUserProgress(userId);
    const userSubscriptionData = getUserSubscription();
    const topTenUsersData = getTopTenUsers();

    const [userProgress, userSubscription, topTenUsers] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        topTenUsersData,
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
                
                <div className="flex-1">
                    <div className="w-full flex flex-col items-center pt-6">
                        <Image
                            src="/gold-medal.png"
                            alt="Leaderboard"
                            height={90}
                            width={90}
                        />
                        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                            Clasament
                        </h1>
                        <p className="text-muted-foreground text-center text-lg mb-6">  
                          Vezi unde te afli în comparație cu ceilalți din comunitate.
                        </p>
                        <Separator className="mb-4 h-0.5 rounded-full" />
                        {topTenUsers.map((userProgress, index) => (
                            <div 
                            key={userProgress.userId}
                            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                            >
                                  <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                                <AvatarImage 
                                className="object-cover"
                                src={userProgress.userImageSrc} />
                            </Avatar>
                            <p className="font-bold text-neutral-800 flex-1">
                                {userProgress.userName}
                            </p>
                            <p className="text-muted-foreground">
                                {userProgress.points} XP
                            </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaderboardPage;