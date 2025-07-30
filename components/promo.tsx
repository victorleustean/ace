import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-x-2">
                <Image
                    src="/shining.png"
                    alt="Pro"
                    height={26}
                    width={26}
                />
                <h3 className="font-bold text-lg">
                    Fă upgrade la versiunea Pro
                </h3>
            </div>
            <p className="text-muted-foreground">
                Obține vieți nelimitate și multe altele.
            </p>
          </div>
          
          <Button
              asChild
              variant="super"
              className="w-full"
              size="lg"
          >
            <Link href="/store">
                Fă upgrade azi
            </Link>
          </Button>
        </div>
    );
};