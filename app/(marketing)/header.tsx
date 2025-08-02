import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  return (
    <header className="sticky top-0 py-4 border-b border-white/15 md:border-none backdrop-blur-sm z-20 transition-all duration-300 bg-transparent">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="relative w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto md:border border-black/15 md:p-2.5 rounded-xl">
          
          {/* Left: Logo - Fixed width container */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 md:left-2.5 z-10">
            <div className="border h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 rounded-lg inline-flex justify-center items-center border-white/15">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={32} 
                height={32} 
                priority
                className="lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12" 
              />
            </div>
          </div>

          {/* Center: Navigation - Absolutely centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <nav className="flex gap-6 lg:gap-8 xl:gap-10 2xl:gap-14 text-sm lg:text-base xl:text-lg 2xl:text-xl items-center whitespace-nowrap">
              <a href="#" className="text-black/90 hover:text-black transition">Funcționalități</a>
              <a href="#" className="text-black/90 hover:text-black transition">Despre noi</a>
              <a href="#" className="text-black/90 hover:text-black transition">Produse</a>
              <a href="#" className="text-black/90 hover:text-black transition">Ajutor și asistență</a>
            </nav>
          </div>

          {/* Right: CTA Button + Menu Icon - Fixed width container */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:right-2.5 z-10">
            <div className="flex gap-4 items-center">
              <ClerkLoading>
                <div className="h-10 w-24 bg-black/10 animate-pulse rounded-lg flex items-center justify-center">
                  <Loader className="h-5 w-5 text-black animate-spin" />
                </div>
              </ClerkLoading>
              
              <ClerkLoaded>
                <SignedIn>
                  <Link href="/courses">
                    <Button
                        variant="default"
                        className="relative py-2 px-3 lg:py-3 lg:px-4 xl:py-3 xl:px-5 2xl:py-4 2xl:px-6 rounded-lg font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl bg-gradient-to-b from-black to-[#001E80] shadow-[0px_0px_12px_#001E80]">
                      <div className="absolute inset-0">
                        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                        <div className="absolute inset-0 shadow-[0_0_10px_rgb(0,30,128,.7)_inset] rounded-lg"></div>
                      </div>
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" fallbackRedirectUrl="/courses" forceRedirectUrl="/courses">
                    <Button className="relative py-2 px-3 lg:py-3 lg:px-4 xl:py-3 xl:px-5 2xl:py-4 2xl:px-6 rounded-lg font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl bg-gradient-to-b from-black to-[#001E80] shadow-[0px_0px_12px_#001E80]">
                      <div className="absolute inset-0">
                        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                        <div className="absolute inset-0 shadow-[0_0_10px_rgb(0,30,128,.7)_inset] rounded-lg"></div>
                      </div>
                      <span>Încearcă gratuit!</span>
                    </Button>
                  </SignInButton>
                </SignedOut>
              </ClerkLoaded>

              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 cursor-pointer text-black md:hidden" />
                </SheetTrigger>
                <SheetContent side="right" className="p-6">
                  <nav className="flex flex-col gap-6 mt-8">
                    <a href="#" className="text-black hover:text-gray-600 transition text-lg">Funcționalități</a>
                    <a href="#" className="text-black hover:text-gray-600 transition text-lg">Despre noi</a>
                    <a href="#" className="text-black hover:text-gray-600 transition text-lg">Produse</a>
                    <a href="#" className="text-black hover:text-gray-600 transition text-lg">Ajutor și asistență</a>
                    <div className="mt-6">
                      <ClerkLoaded>
                        <SignedIn>
                          <Link href="/courses">
                            <Button
                                variant="default"
                                className="w-full bg-black text-white hover:bg-gray-800"
                                size="lg">
                              Dashboard
                            </Button>
                          </Link>
                        </SignedIn>
                        <SignedOut>
                          <SignInButton mode="modal" fallbackRedirectUrl="/courses" forceRedirectUrl="/courses">
                            <Button className="w-full bg-black text-white hover:bg-gray-800" size="lg">
                              Încearcă gratuit!
                            </Button>
                          </SignInButton>
                        </SignedOut>
                      </ClerkLoaded>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Invisible spacer to maintain height */}
          <div className="h-10 lg:h-12 xl:h-14 2xl:h-16"></div>
        </div>
      </div>
    </header>
  )
}