"use client"

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useScroll, useTransform,  } from "framer-motion";
import { useRef } from "react";
import { ClerkLoaded, ClerkLoading,  SignedOut, SignInButton,  } from "@clerk/nextjs";

export function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  })
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150])

  
  return (
    <section ref={heroRef} className="pt-0 pb-20 md:pb-10 bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px] xl:w-[600px] px-4 md:px-0 md:ml-8 xl:ml-16">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Versiunea Beta-0.1 e aici!
            </div>
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Startul tău financiar începe aici
            </h1>
            <p className="text-xl xl:text-2xl text-[#010D3E] tracking-tight mt-6">
              Cu o aplicație care te ajută să înveți, să economisești și să-ți înțelegi banii, fiecare progres devine o reușită.
              Ține-ți evoluția sub control, păstrează-ți motivația și sărbătorește-ți succesul financiar – pas cu pas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-1 items-center mt-[30px]">
              <ClerkLoading>
                <Loader className="h-5 w-5 text-white animate-spin" />
              </ClerkLoading>
              
              <ClerkLoaded>
                <SignedOut>
                  <SignInButton mode="modal" fallbackRedirectUrl="/courses" forceRedirectUrl="/courses">
                    <Button
                        variant="default"
                        className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                        size="lg">
                      Încearcă FinHub gratuit!
                    </Button>
                  </SignInButton>
                  <Button
                      variant="default"
                      className="w-full sm:w-auto bg-white text-black hover:bg-gray-100"
                      size="lg">
                      Află mai multe
                  </Button>
                </SignedOut>
              </ClerkLoaded>
            </div>
          </div>
                   
          <div className="mt-20 md:mt-0 md:h-[648px] xl:h-[780px] md:flex-1 relative">
            <motion.div
               className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 xl:left-8 xl:scale-110"
               animate={{
                translateY: [-30, 30],
               }}
               transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: 'easeInOut',
               }}
            >
              <Image
                 src="/ChatGPT Image 14 iun. 2025, 15_24_19.png"
                 alt="Hero Dollar"
                 width={400}
                 height={400}
                 priority={true}
                 className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.img
               src="/cylinder-p.webp"
               width={220}
               height={220}
               alt="Cylinder Image"
               loading="lazy"
               className="hidden md:block -top-8 -left-32 md:absolute xl:-left-24 xl:-top-12 xl:scale-110"
               style={{
                translateY: translateY,
               }}
             />
            <motion.img
               src="/noodle-p.webp"
               width={220}
               height={220}
               alt="Noodle Image"
               loading="lazy"
               className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg] xl:top-[620px] xl:left-[520px] xl:scale-110"
               style={{
                rotate: 30,
                translateY: translateY,
               }}
             />
          </div>
        </div>
      </div>
    </section>
  );
}