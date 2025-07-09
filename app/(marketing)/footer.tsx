import logo from "@/public/alpha.png";
import Image from "next/image";
import socialX from "@/public/social-x.svg";
import socialLinkedin from "@/public/social-linkedin.svg";
import socialInsta from "@/public/social-insta.svg";
import socialYoutube from "@/public/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm 2xl:text-base py-6 2xl:py-8 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:blur before:bg-[linear-gradient(to_right,#F8FBFF,#FB92CF,#FFD9B,#C2F0B1,#2FD8FE)] before:absolute">
            <Image src={logo} height={40} width={40} alt="alpha" className="relative 2xl:h-[60px] 2xl:w-[60px]" />
          </div>
          
          <nav className="flex flex-col gap-6 2xl:gap-8 mt-6 2xl:mt-10 md:flex-row md:justify-center items-center">
            <a href="#" className="hover:text-white transition-colors 2xl:text-lg text-center">Despre noi</a>
            <a href="#" className="hover:text-white transition-colors 2xl:text-lg text-center">Misiune</a>
            <a href="#" className="hover:text-white transition-colors 2xl:text-lg text-center">Abonamente</a>
            <a href="#" className="hover:text-white transition-colors 2xl:text-lg text-center">Centru de ajutor</a>
          </nav>
          
          <div className="flex justify-center gap-6 2xl:gap-8 mt-6 2xl:mt-10 items-center">
            <Image src={socialLinkedin} alt="LinkedIn" className="h-6 w-6 2xl:h-8 2xl:w-8 hover:opacity-80 transition-opacity cursor-pointer" />
            <Image src={socialYoutube} alt="YouTube" className="h-6 w-6 2xl:h-8 2xl:w-8 hover:opacity-80 transition-opacity cursor-pointer" />
            <Image src={socialInsta} alt="Instagram" className="h-6 w-6 2xl:h-8 2xl:w-8 hover:opacity-80 transition-opacity cursor-pointer" />
            <Image src={socialX} alt="X (Twitter)" className="h-6 w-6 2xl:h-8 2xl:w-8 hover:opacity-80 transition-opacity cursor-pointer" />
          </div>
          
          <p className="mt-6 2xl:mt-10 2xl:text-lg text-center">&copy; 2025 Finhub, Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};







 
 
 