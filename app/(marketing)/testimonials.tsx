"use client"

import React, { useState } from "react";

import AlecWhitten from "@/public/alec-whitten.jpg";
import ReneWells from "@/public/rene-wells.jpg";
import MollieHall from "@/public/mollie-hall.jpg";

import Image from "next/image"
import { Quote } from "lucide-react";
import { motion,   LayoutGroup } from "framer-motion"
import IoanChelaru from "@/public/IoanChelaru1.jpg"

export const testimonials = [
  {
    quote:
      "FinHub oferă pregătire riguroasă și inteligentă pentru viitorii juriști. Este un instrument modern, eficient și perfect adaptat cerințelor actuale. Îl recomand fără rezerve!",
    name: "Avocat dr.Ioan Chelaru",
    title: "profesor universitar",
    image: IoanChelaru,
  },
  {
    quote:
      "Sphereal integrates effortlessly with our existing tools, and the AI chatbot feels like a natural extension of our team. The responses are impressively accurate, and it's always learning from our interactions.",
    name: "Alec Whitten",
    title: "Lead Developer",
    image: AlecWhitten,
  },
  {
    quote:
      "Sphereal's AI has elevated our customer service to a whole new level. Its real-time responses and personalized recommendations help us address client needs faster than ever. I can't imagine our support team without it.",
    name: "Rene Wells",
    title: "Customer Success Manager",
    image: ReneWells,
  },
  {
    quote:
      "I've never seen a tool like Sphereal. It's intuitive, responsive, and has helped us streamline projects that would normally take days. The AI capabilities are unmatched in terms of accuracy and speed.",
    name: "Mollie Hall",
    title: "Product Designer",
    image: MollieHall,
  },
];

export const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  return (
    <section className="bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_69%)] py-16 lg:py-20">
      <div className="w-full max-w-6xl mx-auto px-4">
        <LayoutGroup>
        
            <motion.div layout className="border-gradient rounded-3xl px-6 md:px-10 lg:px-16 py-12 lg:py-16 pb-16 lg:pb-16 relative flex flex-col gap-12 mx-auto">
              <Quote className="absolute size-20 text-black top-0 left-6 md:left-10 lg:left-16 -translate-y-1/2" />
              
              {/* Dots positioned at bottom center on mobile, right side on desktop */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 lg:bottom-auto lg:left-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 md:lg:right-10 lg:lg:right-16">
                <div className="bg-white inline-flex flex-row gap-4 lg:flex-col p-2.5 rounded-full">
                  {testimonials.map((_, index) => (
                    <div 
                      key={index} 
                      className={`size-2.5 rounded-full cursor-pointer transition-colors ${
                        testimonialIndex === index ? 'bg-black' : 'bg-black/50'
                      }`}
                      onClick={() => setTestimonialIndex(index)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center items-center w-full">
                <div className="max-w-4xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    testimonialIndex === index && (
                      <motion.blockquote 
                        initial={{opacity:0, y: 25}} 
                        animate={{opacity: 1, y:0}} 
                        exit={{opacity: 0, y:25}} 
                        transition={{ duration: 0.5 }} 
                        key={testimonial.name} 
                        className="flex flex-col lg:flex-row lg:items-center lg:gap-8 text-center lg:text-left"
                      >
                        <p className="text-xl font-medium md:text-2xl bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm flex-1 text-center">{testimonial.quote}</p>
                        <cite className="not-italic flex flex-col items-center mt-6 lg:mt-0">
                          <Image src={testimonial.image} alt={testimonial.name} className="rounded-xl size-28 max-w-none mb-4" />
                          <div className="font-bold text-center">{testimonial.name}</div>
                          <div className="text-xs text-grey-400 text-center">{testimonial.title}</div>
                        </cite>
                      </motion.blockquote>
                    )
                  ))}
                </div>
              </div>
              
            </motion.div>
            
        </LayoutGroup>
            
          
      </div>
    </section>
  );
};