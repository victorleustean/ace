"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section ref={sectionRef} className="bg-gradient-to-b from-white via-[#D2DCFF] to-white flex items-center justify-center overflow-x-clip mt-24 mb-32">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="section-heading relative text-center mb-4">
                        <h2 className="text-3xl md:text-[54px] xl:text-[64px] 2xl:text-[80px] md:leading-[60px] xl:leading-[72px] 2xl:leading-[88px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
                            Înregistrează-te gratuit acum!
                        </h2>
                        <p className="text-[22px] xl:text-[26px] 2xl:text-[32px] leading-[30px] xl:leading-[36px] 2xl:leading-[42px] tracking-tight text-[#010D3E] mt-3 max-w-4xl mx-auto">
                           FinHub nu este doar o platformă de pregătire, ci și un ghid pentru înțelegerea lumii financiare. Îți oferă noțiuni clare de educație financiară și antreprenorială, esențiale pentru orice viitor profesionist. Înveți cum să-ți gestionezi banii, să gândești strategic și să construiești pe termen lung.
                        </p>
                        <motion.img
                            src="/star.png" 
                            alt="Star Image" 
                            width={360} 
                            height={360}
                            loading="lazy"
                            className="absolute -left-[350px] 2xl:-left-[450px] -top-[137px] 2xl:-top-[170px] 2xl:w-[450px] 2xl:h-[450px] hidden md:block" 
                            style={{
                                translateY
                            }}
                        />
                        <motion.img 
                            src="/spring.png" 
                            alt="Spring Image" 
                            width={360} 
                            height={360}
                            loading="lazy"
                            className="absolute -right-[331px] 2xl:-right-[420px] -top-[19px] 2xl:-top-[25px] 2xl:w-[450px] 2xl:h-[450px] hidden md:block" 
                            style={{
                                translateY
                            }}
                        />
                    </div>
                    <div className="flex gap-2 2xl:gap-4 justify-center flex-col sm:flex-row items-center">
                        <Button 
                            variant="default"
                            className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 2xl:text-lg 2xl:py-4 2xl:px-8"
                            size="lg"
                        >
                            Înregistrează-te
                        </Button>
                        <Button 
                            variant="default"
                            className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 gap-1 2xl:gap-2 2xl:text-lg 2xl:py-4 2xl:px-8"
                            size="lg"
                        >
                            Descoperă mai multe despre FinHub
                            <ArrowRight className="h-4 w-4 2xl:h-5 2xl:w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};