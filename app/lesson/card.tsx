import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    id: number;
    imageSrc: string | null;
    audioSrc: string | null;
    text: string;
    shortcut: string;
    selected?: boolean;
    onClick: () => void;
    disabled?: boolean;
    status?: "correct" | "wrong" | "none";
    type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
   
    imageSrc,
   
    text,
    shortcut,
    selected,
    onClick,
    status,
    disabled,
    type,
}: Props) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:pt-6 cursor-pointer active:border-b-2",
                selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
                selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
                selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "hover:bg-white pointer-events-none",
                type === "ASSIST" && "lg:p-3 w-full"
            )}
        >
            {imageSrc && (
                <div className="flex justify-center mb-4">
                    <Image 
                        src={imageSrc} 
                        width={150}
                        height={150}
                        alt={text}
                        className="object-contain max-h-[80px] lg:max-h-[150px]"
                    />
                </div>
            )}
            <div className={cn(
                "flex items-center justify-between",
                type === "ASSIST" && "flex-row-reverse",
            )}>
                {type === "ASSIST" && <div />}
                <p className={cn(
                    "text-neutral-600 text-sm lg:text-base",
                    selected && "text-sky-500",
                    selected && status === "correct" && "text-green-500",
                    selected && status === "wrong" && "text-rose-500",
                )}>
                    {text}
                </p>
                <div className={cn(
                    "lg:w-[30px] lg:h-[50px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
                    selected && "border-sky-300 text-sky-500",
                    selected && status === "correct" && "border-green-500 text-green-500",
                    selected && status === "wrong" && "border-rose-500 text-rose-500",
                )}>
                    {shortcut}
                </div>
            </div>
        </div>
    );
};