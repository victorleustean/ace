import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button"; // Added missing Button import

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/alpha.png" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-grey-600 tracking-wide">FinHub</h1>
        </div>
        <div className="flex items-center gap-x-4">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton aftersignouturl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" aftersigninurl="/learn" aftersignupurl="/learn">
                <Button size="lg" variant="ghost">
                  Conectare
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
};