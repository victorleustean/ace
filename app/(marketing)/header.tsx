import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

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
                <div className="relative py-2 px-3 lg:py-3 lg:px-4 xl:py-3 xl:px-5 2xl:py-4 2xl:px-6 rounded-lg font-medium text-sm lg:text-base xl:text-lg 2xl:text-xl bg-gradient-to-b from-black to-[#001E80] shadow-[0px_0px_12px_#001E80]">
                  <div className="absolute inset-0">
                    <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                    <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                    <div className="absolute inset-0 shadow-[0_0_10px_rgb(0,30,128,.7)_inset] rounded-lg"></div>
                  </div>
                  <Loader className="h-5 w-5 text-white animate-spin" />
                </div>
              </ClerkLoading>
              
              <ClerkLoaded>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" aftersigninurl="/learn" aftersignuppurl="/learn">
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

              <Menu className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 cursor-pointer text-black md:hidden" />
            </div>
          </div>

          {/* Invisible spacer to maintain height */}
          <div className="h-10 lg:h-12 xl:h-14 2xl:h-16"></div>
        </div>
      </div>
    </header>
  )
}
/*"use client"

import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '@/public/alpha.png';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
c
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="c backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">Fii smart cu banii tăi. Viitorul tău îți va mulțumi.</p>
        <div className="inline-flex gap-1 items-center">
          <p>Începeți să utilizați gratuit!</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>
      
      <div className="py-5">   
        <div className="container flex items-center justify-between">
          <div className="flex items-center"> 
            <Image src={Logo} alt="Sass Logo" height={40} width={40} />
          </div>
          
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          
      
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6 text-black/60 items-center">
              <a href="#">Despre noi</a>
              <a href="#">Misiune</a>
              <a href="#">Abonamente</a>
              <a href="#">Centru de ajutor</a>
            </nav>
            
            <div className="flex gap-x-4 items-center">
              <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                    <Button size="lg" variant="default">
                      Conectare
                    </Button>
                  </SignInButton>
                </SignedOut>
              </ClerkLoaded>
            </div>
          </div>
        </div> 
        
       
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
            <div className="container py-4">
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-black/60 py-2 border-b">Despre noi</a>
                <a href="#" className="text-black/60 py-2 border-b">Misiune</a>
                <a href="#" className="text-black/60 py-2 border-b">Abonamente</a>
                <a href="#" className="text-black/60 py-2">Centru de ajutor</a>
                

                <div className="pt-4">
                  <ClerkLoading>
                    <div className="flex items-center gap-2">
                      <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                      <span>Se încarcă...</span>
                    </div>
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignedIn>
                      <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                        <span className="text-sm text-black/60">Contul meu</span>
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                        <Button size="lg" variant="default" className="w-full">
                          Conectare
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  </ClerkLoaded>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; */


/*import Image from "next/image";
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
}; */