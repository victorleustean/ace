import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import cogImage from "@/public/ChatGPT Image 14 iun. 2025, 15_24_19.png"; 
import Image from "next/image";
import cylinderImage from "@/public/cylinder.png";
import noodleImage from "@/public/noodle.png";

export function Hero() {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
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
                <Button 
                   variant="default" 
                   className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 "
                   size="lg">
                  Încearcă FinHub gratuit!
                </Button>
                <Button 
                   variant="default" 
                   className="w-full sm:w-auto bg-white text-black hover:bg-gray-100"
                    size="lg">
                    Încearcă FinHub gratuit!
                </Button>
            </div>
          </div>
          
          <div className="mt-20 md:mt-0 md:h-[648px] xl:h-[780px] md:flex-1 relative">
            <Image 
              src={cogImage} 
              alt="cogImage" 
              width={400} 
              height={400} 
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 xl:left-8 xl:scale-110"
            />
            <Image 
              src={cylinderImage} 
              width={220} 
              height={220} 
              alt="Cylinder Image" 
              className="hidden md:block -top-8 -left-32 md:absolute xl:-left-24 xl:-top-12 xl:scale-110" 
            />
            <Image 
              src={noodleImage} 
              width={220} 
              className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg] xl:top-[620px] xl:left-[520px] xl:scale-110" 
              alt="NoodleImage" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}