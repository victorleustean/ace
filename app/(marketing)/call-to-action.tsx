import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import starImage from "@/public/star.png";
import springImage from "@/public/spring.png";
import Image from "next/image";

export const CallToAction = () => {
    return (
        <section className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 2xl:py-32 overflow-x-clip">
            <div className="container">
                <div className="section-heading relative">
                    <h2 className="text-center text-3xl md:text-[54px] xl:text-[64px] 2xl:text-[80px] md:leading-[60px] xl:leading-[72px] 2xl:leading-[88px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
                        Înregistrează-te gratuit acum!
                    </h2>
                    <p className="text-center text-[22px] xl:text-[26px] 2xl:text-[32px] leading-[30px] xl:leading-[36px] 2xl:leading-[42px] tracking-tight text-[#010D3E] mt-5 2xl:mt-8">
                        Cu o aplicație care te ajută să înveți, să economisești și să-ți înțelegi banii, fiecare progres devine o reușită.
                        Ține-ți evoluția sub control, păstrează-ți motivația și sărbătorește-ți succesul financiar – pas cu pas
                    </p>
                    <Image 
                        src={starImage} 
                        alt="Star Image" 
                        width={360} 
                        height={360}
                        className="absolute -left-[350px] 2xl:-left-[450px] -top-[137px] 2xl:-top-[170px] 2xl:w-[450px] 2xl:h-[450px] hidden md:block" 
                    />
                    <Image 
                        src={springImage} 
                        alt="Spring Image" 
                        width={360} 
                        height={360}
                        className="absolute -right-[331px] 2xl:-right-[420px] -top-[19px] 2xl:-top-[25px] 2xl:w-[450px] 2xl:h-[450px] hidden md:block" 
                    />
                </div>
                <div className="flex gap-2 2xl:gap-4 mt-10 2xl:mt-16 justify-center flex-col sm:flex-row">
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
        </section>
    );
};