"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Star from "@/public/star.png"
import Pyramid from "@/public/pyramid.png"
import Spring from "@/public/spring.png"
import Coil from "@/public/cog.png"
import React, { useState, useRef } from "react"

const cardData = [
    {
        image: Pyramid,
        title: 'gratuit. distractiv. eficient',
        description: 'E distractiv să înveți cu FinHub! Vei câștiga puncte și vei debloca niveluri noi cu lecții rapide și scurte, dobândind, în același timp, și abilități de comunicare în conversații reale.'
    },
    
    {
        image: Star,
        title: 'FinHub for schools',
        description: 'Dragi profesori, suntem aici să vă ajutăm! Instrumentele noastre gratuite vă ajută elevii la învățarea disciplinelor din sfera economiei şi finanțelor prin intermediul aplicației FinHub, atât la clasă cât și în afara ei.',
    },
   
    {
        image: Coil,
        title: 'bazat pe știință',
        description: 'Folosim o combinație de metode de predare bazate pe știință și conținut atractiv pentru a crea cursuri care dezvoltă în mod eficient abilitățile de alfabetism financiar şi gândire critică!'
    },
    
    {
        image: Spring,
        title: 'FinHub pentru admiterea la drept',
        description: 'FinHub oferă un antrenament complet, personalizat și adaptiv, inspirat de modelele de subiecte oficiale și cerințele actuale pentru admiterea la facultățile de drept din România.'
    },
]

export const FeaturesCardSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const scrollToCard = (index) => {
        setCurrentIndex(index);
        if (scrollContainerRef.current) {
            const cardWidth = 384; // w-96 = 384px
            const gap = 32; // gap-8 = 32px
            const scrollPosition = index * (cardWidth + gap);
            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-24 md:-mt-28 overflow-hidden">
            <div className="container">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full px-4">
                    <h2 className="text-center font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text -mt-20 md:mt-5 lg:-mt-14 text-3xl md:text-3xl lg:text-6xl">
                        Cu FinHub, devii stăpân pe finanțele tale – simplu și eficient.
                    </h2>
                </div>
                
                <div className="mt-16 lg:mt-20 overflow-x-auto pt-28" ref={scrollContainerRef}>
                    <div className="flex gap-8 min-w-max px-4">
                        {cardData.map(({ image, title, description }, index) => (
                            <div key={index} className="relative z-0 p-8 md:m-10 w-80 md:w-96 flex-shrink-0 group">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_100%)] -z-10 rounded-2xl [mask-image:linear-gradient(225deg,transparent,transparent_40px,black_40px)]"></div>
                                <div className="flex justify-center -mt-28">
                                    <div className="inline-flex relative">
                                        <div className="absolute h-4 w-full top-[calc(100%+16px)] bg-zinc-950/70 group-hover:bg-zinc-950/30 transition duration-300 rounded-[100%] [mask-image:radial-gradient(closest-side,black,transparent)]"></div>
                                        <Image src={image} alt={`${title} Image`} className="size-40 group-hover:-translate-y-6 transition-300" />
                                    </div>
                                </div>
                                <h3 className="text-black text-3xl mt-12">{title}</h3>
                                <p className="text-lg text-white mt-4">{description}</p>
                                <div className="flex items-center gap-2 justify-between mt-12">
                                    <Button className="text-sm font-heading uppercase font-extrabold tracking-wider text-white" variant="primary outline">
                                        Afla mai multe
                                    </Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8 text-white group-hover:text-black -translate-x-2 group-hover:translate-x-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Centered dots at all screen sizes */}
                <div className="w-full flex justify-center mt-10">
                    <div className="bg-black inline-flex gap-4 p-2.5 rounded-full">
                        {cardData.slice(0, 3).map((_, index) => (
                            <div 
                                key={index} 
                                className={`size-2.5 rounded-full cursor-pointer transition-colors ${
                                    currentIndex === index ? 'bg-white' : 'bg-white/50'
                                }`}
                                onClick={() => scrollToCard(index)}
                            />
                        ))}
                    </div>  
                </div>
            </div>
        </section>
    )
}