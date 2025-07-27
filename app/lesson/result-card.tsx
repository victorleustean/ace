import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
    value: number;
    variant: "points" | "hearts"
};

export const ResultCard = ({ value, variant }: Props) => {
    const imageSrc = variant === "hearts" ? "/hearts.png" : "/diamond.png"; // Changed ImageSrc to imageSrc
    return(
        <div className={cn(
            "rounded-xl border-2 w-full",
            variant === "points" && "bg-orange-400 border-orange-400",
            variant === "hearts" && "bg-rose-400 border-rose-400" // Also fixed this line - was checking points twice
        )}>
            <div className={cn(
                'p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs'
            )}>
                {variant === "hearts" ? "Inimi rămase" : "Total diamante"}
            </div>
            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                variant === "points" && "text-orange-400",
                variant === "hearts" && "text-rose-500"
            )}>
                <Image 
                alt="Icon"
                src={imageSrc}
                height={30}
                width={30}
                className="mr-1.5"/>
               {value}
            </div>
        </div>
    );
}