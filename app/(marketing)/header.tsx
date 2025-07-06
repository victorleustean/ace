"use client"

import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '@/public/alpha.png';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
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
          
          {/* Menu hamburger - doar pe mobile, în dreapta */}
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
          
          {/* Desktop Navigation */}
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
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
            <div className="container py-4">
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-black/60 py-2 border-b">Despre noi</a>
                <a href="#" className="text-black/60 py-2 border-b">Misiune</a>
                <a href="#" className="text-black/60 py-2 border-b">Abonamente</a>
                <a href="#" className="text-black/60 py-2">Centru de ajutor</a>
                
                {/* Authentication în meniul mobil */}
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
};


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