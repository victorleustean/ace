"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const pricingTiers = [
  {
    title: "Gratuit",
    monthlyPrice: 0,
    buttonText: "Încercați gratuit",
    popular: false,
    inverse: false,
    features: [
      "Până la 3 lecții pe zi",
      "Acces la cursul de educație financiară",
    ],
  },
  {
    title: "Gold",
    monthlyPrice: 9,
    buttonText: "Abonează-te acum",
    popular: true,
    inverse: true,
    features: [
      "Acces la cursul de educație financiară și antreprenorială",
      "Acces la Cleo, consultantul tău AI",
      "Lecții nelimitate în fiecare zi",
      "Puncte și inimi nelimitate pentru a învăța fără stres",
    ],
  },
  {
    title: "Platinum",
    monthlyPrice: 19,
    buttonText: "Abonează-te acum",
    popular: false,
    inverse: false,
    features: [
      "Lecții private cu Cleo",
      "Acces la cursurile de educație financiară, antreprenorială și de admitere la Drept",
      "Hărți mentale, flashcarduri și lecții personalizate pentru a învăța mai ușor",
      "Simulări de examen",
      "Întâlniri lunare cu profesori, avocați și mentori",
      "Rată de satisfacție de 98%",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 2xl:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="section-heading text-center mb-10 2xl:mb-16">
            <h2 className="text-3xl md:text-[54px] xl:text-[64px] 2xl:text-[80px] md:leading-[60px] xl:leading-[72px] 2xl:leading-[88px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
              Abonamentele FinHub
            </h2>
            <p className="text-[22px] xl:text-[26px] 2xl:text-[32px] leading-[30px] xl:leading-[36px] 2xl:leading-[42px] tracking-tight text-[#010D3E] mt-5 2xl:mt-8">
              Gratuit pentru totdeauna. Fă upgrade pentru lecții premium, simulări de examen și rapoarte de progres.
            </p>
          </div>
          <div className="flex flex-col gap-6 2xl:gap-8 items-center justify-center lg:flex-row lg:items-end w-full max-w-5xl">
            {pricingTiers.map(({ title, monthlyPrice, buttonText, popular, inverse, features }) => (
              <div key={title} className="flex justify-center">
                <div className={twMerge("p-10 2xl:p-14 border border-[#F1F1F1] rounded-3xl 2xl:rounded-[40px] shadow-[0_7px_14px_#EAEAEA] max-w-xs 2xl:max-w-md w-full", inverse === true && "bg-black border-black text-white")}>
                  <div className="flex justify-between items-start">
                    <h3 className={twMerge("text-lg 2xl:text-xl font-bold text-black/50", inverse===true && "text-white/60")}>{title}</h3>
                    {popular && (
                      <motion.span 
                      animate={{
                        backgroundPositionX: "-100%"
                      }}
                      transition={{
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                        duration: 1,
                      }}
                      className="bg-gradient-to-r from-[#DD7DDF] via-[#E1CD86] via-[#BBCB92] via-[#71C2EF] to-[#3BFFFF] text-transparent [background-size:200%] bg-clip-text font-medium text-sm 2xl:text-base">
                        Cea mai populară opțiune
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-[30px] 2xl:mt-10">
                    <span className="text-4xl 2xl:text-5xl font-bold tracking-tighter leading-none">€{monthlyPrice}</span>
                    <span className="tracking-tight font-bold text-black/50 2xl:text-lg">pe lună</span>
                  </div>
                  <Button className={twMerge("w-full mt-[30px] 2xl:mt-10 2xl:py-4 2xl:text-lg", inverse===true && "bg-white text-black")}>
                    {buttonText}
                  </Button>
                  <ul className="flex flex-col gap-5 2xl:gap-6 mt-8 2xl:mt-10">
                    {features.map((feature, index) => (
                      <li key={index} className="text-sm 2xl:text-base flex items-center gap-4">
                        <CheckIcon className="h-6 w-6 2xl:h-7 2xl:w-7 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};