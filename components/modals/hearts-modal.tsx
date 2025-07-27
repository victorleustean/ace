"use client";

import Image from "next/image";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
   
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { Button } from "@/components/ui/button";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => setIsClient(true), []);
 
  const onClick = () => {
    close();
    router.push("/store");
}

  if (!isClient) {
    return null;
  }

  return(
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="flex flex-col items-center w-full justify-center mb-5">
                    <Image
                        src="/mascot_bad.png"
                        alt="Mascot"
                        height={80}
                        width={80}
                        className="mb-4"
                    />
                    <DialogTitle className="text-center font-bold text-2xl mb-2">
                       Ai rămas fără inimi!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Obține FinHub Gold sau Platinum pentru inimi nelimitate, sau cumpără-le din magazin.
                    </DialogDescription>
                </div>
            </DialogHeader>
            <DialogFooter className="mb-4">
                <div className="flex flex-col gap-y-4 w-full">
                    <Button variant="primary" className="w-full -mt-5" size="lg" onClick={onClick} >
                        Obține inimi nelimitate
                    </Button>
                    <Button variant="primaryOutline" className="w-full " size="lg" onClick={() => {
                        close();}} >
                        Poate mai târziu
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};