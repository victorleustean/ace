"use client";

import Image from "next/image";
import { useState, useEffect } from "react"

   
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { usePracticeModal } from "@/store/use-practice-modal";
import { Button } from "@/components/ui/button";

export const PracticeModal = () => {

  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);
 
  

  if (!isClient) {
    return null;
  }

  return(
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="flex flex-col items-center w-full justify-center mb-5">
                    <Image
                        src="/hearts.png"
                        alt="Heart"
                        height={100}
                        width={100}
                        className="mb-4"
                    />
                    <DialogTitle className="text-center font-bold text-2xl mb-2">
                       Hai să exersăm!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Folosește lecțiile de exersare pentru a recâștiga inimi și puncte. Nu poți pierde inimi în lecțiile de exersare.
                    </DialogDescription>
                </div>
            </DialogHeader>
            <DialogFooter className="mb-4">
                <div className="flex flex-col gap-y-4 w-full">
                    <Button variant="primary" className="w-full -mt-5" size="lg" onClick={close} >
                        Am înțeles


                    </Button>
                   
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};