"use client"

import productImage from "@/public/product-image.png"
import Image from "next/image"
import pyramidImage from "@/public/pyramid.png"
import tubeImage from "@/public/tube.png"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const ProductShowcase = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    })
    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150])
    
    return(
       <section  ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] min-h-screen flex items-center justify-center py-24 overflow-x-clip" >
        <div className="w-full">
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[540px] xl:max-w-[640px] mx-auto text-center mb-10 xl:mb-16">
                        <div className="flex justify-center">
                            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Fii mai deștept cu banii tăi</div>
                        </div>
                    </div>
                </div>
                <div className="w-full text-center mb-10 xl:mb-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-[54px] xl:text-[64px] md:leading-[60px] xl:leading-[72px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">Cu FinHub, înveți pentru admitere, îți gestionezi banii și gândești antreprenorial – totul într-un singur loc</h2>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[540px] xl:max-w-[640px] mx-auto text-center mb-10 xl:mb-16">
                        <p className="text-[22px] xl:text-[26px] leading-[30px] xl:leading-[36px] tracking-tight text-[#010D3E]">FinHub te pregătește pentru viitorul tău financiar și academic – direct de pe orice ecran.</p>
                    </div>
                    <div className="relative flex justify-center w-full">
                        <Image 
                            src={productImage} 
                            alt="ProductImage" 
                            className="max-w-full h-auto"
                            priority
                        />
                        <motion.div 
                            className="hidden md:block absolute -right-36 xl:-right-48 -top-32 xl:-top-40 xl:scale-125" 
                            style={{translateY}}
                        >
                            <Image 
                                src={pyramidImage} 
                                alt="PyramidImage" 
                                height={262} 
                                width={262}
                                loading="lazy"
                                priority={false}
                            />
                        </motion.div>
                        <motion.div 
                            className="hidden md:block absolute bottom-24 xl:bottom-32 -left-36 xl:-left-48 xl:scale-125" 
                            style={{translateY}}
                        >
                            <Image 
                                src={tubeImage} 
                                alt="TubeImage" 
                                height={248} 
                                width={248}
                                loading="lazy"
                                priority={false}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
       </section>
    )
}