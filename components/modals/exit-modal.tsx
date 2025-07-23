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
import { useExitModal } from "@/store/use-exit-modal";
import { Button } from "@/components/ui/button";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

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
                        src="/sad-panda.png"
                        alt="Mascot"
                        height={80}
                        width={80}
                        className="mb-4"
                    />
                    <DialogTitle className="text-center font-bold text-2xl mb-2">
                        Stai, nu pleca!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Ești pe cale să părăsești lecția.Ești sigur?
                    </DialogDescription>
                </div>
            </DialogHeader>
            <DialogFooter className="mb-4">
                <div className="flex flex-col gap-y-4 w-full">
                    <Button variant="primary" className="w-full -mt-5" size="lg" onClick={close} >
                        Continuă să înveți
                    </Button>
                    <Button variant="Danger" className="w-full text-rose-500" size="lg" onClick={() => {
                        close();
                        router.push("/learn")
                    }} >
                        Încheie sesiunea
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};