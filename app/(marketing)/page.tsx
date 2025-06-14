import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home(){
return (
  <div className="max-w-[998px] mx-auto flex-1 w-full felx flex-col lg:flex-row items-center justify-center p-4 gap-2 "> 
  
<div className="relative w-[240px] h-[240px] lg:w-[440px] lg:h-[424px] mb-8 lg:mb-0">
    <Image src= "/ChatGPT Image 14 iun. 2025, 15_24_19.png" fill alt="Hero" />
  </div>
 <div className="flex flex-col items-center gap-y-8">
  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text" bg-gradient-to-b>Startul tău financiar începe aici.</h1>
  <p className="text-xl text-[#010D3E] tracking-tight mt-6 lg:text-3xl font-bold max-w-[480px] text-center ">Cu o aplicație care te ajută să înveți, să economisești și să-ți înțelegi banii, fiecare progres devine o reușită.
  Ține-ți evoluția sub control, păstrează-ți motivația și sărbătorește-ți succesul financiar – pas cu pas.</p>
  </div>
  
  <div>

<ClerckLoading></ClerckLoading>


  </div>
  </div>
)
}


/*<div className="flex flex-col items-center gap-y-8"></div>
  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text" bg-gradient-to-b>Startul tău financiar începe aici.</h1>
  <p className="text-xl text-[#010D3E] tracking-tight mt-6">Cu o aplicație care te ajută să înveți, să economisești și să-ți înțelegi banii, fiecare progres devine o reușită.
  Ține-ți evoluția sub control, păstrează-ți motivația și sărbătorește-ți succesul financiar – pas cu pas.</p>
  <div className="relative w-[240px] h-[240px] lg:w-[440px] lg:h-[424px] mb-8 lg:mb-0">(poze)
  */