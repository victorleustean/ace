import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full gap-4">
        <Button size="lg" variant="ghost" className="flex items-center w-auto">
          <Image src="/hr.svg" alt="Croatian" height={32} width={40} className="mr-4 rounded-md" />
          Croatian
        </Button>
        <Button size="lg" variant="ghost" className="flex items-center w-auto">
          <Image src="/it.svg" alt="Italian" height={32} width={40} className="mr-4 rounded-md" />
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="flex items-center w-auto">
          <Image src="/fr.svg" alt="French" height={32} width={40} className="mr-4 rounded-md" />
          French
        </Button>
      </div>
    </footer>
  );
};


































/* import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full flex items-center">
          <Image src="/hr.svg" alt="Croatian" height={32} width={40} className="mr-4 rounded-md" />
          Croatian
        </Button>
        
         <Button size="lg" variant="ghost" className="w-full flex items-center">
          <Image src="/it.svg" alt="Italian" height={32} width={40} className="mr-4 rounded-md" />
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="w-full flex items-center">
          <Image src="/fr.svg" alt="French" height={32} width={40} className="mr-4 rounded-md" />
          French
        </Button>
    
      </div>
    </footer>
  );
};
*/
 
 
 
 