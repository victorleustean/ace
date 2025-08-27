import { Hero } from "./hero"
import { ProductShowcase } from "./product-showcase"
import { Pricing } from "./pricing"
import { CallToAction } from "./call-to-action"
import { FeaturesCardSection } from "./featurescard";
import { Testimonials } from "./testimonials"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  // If user is signed in, redirect to courses
  if (userId) {
    redirect("/learn");
  }

  return (
    <>
      <Hero />
      <FeaturesCardSection />
      <Testimonials />
      <ProductShowcase />
      <Pricing /> 
      <CallToAction />
    </>
  );
}





















/*import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";
import { ClerkLoading, ClerkLoaded, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getUserProgress } from "@/db/queries";

export default async function Home() {
  const { userId } = await auth();
  let userProgress = null;

  if (userId) {
    try {
      userProgress = await getUserProgress(userId);
    } catch (error) {
      console.error("Error getting user progress:", error);
    }
  }

  return (
    <div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2"> 
      <div className="relative w-[240px] h-[240px] lg:w-[440px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.svg" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
          Startul tău financiar începe aici.
        </h1>
       
        <div className="flex flex-col gap-4 items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <div className="flex flex-row gap-4">
                <SignUpButton mode="modal" forceRedirectUrl="/courses">
                  <Button size="lg" variant="primary">
                    Începeți acum!
                  </Button>
                </SignUpButton>

                <SignInButton mode="modal" forceRedirectUrl="/courses">
                  <Button size="lg" variant="outline">
                    Aveți deja un cont? Conectați-vă!
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href={userProgress && userProgress.activeCourse ? "/learn" : "/courses"}>
                <Button size="lg" variant="secondary">
                  {userProgress && userProgress.activeCourse ? "Continuă să înveți!" : "Alege un curs"}
                </Button>
              </Link> 
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
} */