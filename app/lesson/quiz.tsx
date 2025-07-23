"use client";
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useEffect, useTransition } from "react"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner"
import { redirect } from "next/navigation";
import { ReduceHearts } from "@/actions/user-progress";

type Props = {
    initialPercentage: number; 
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengesOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
}

export const Quiz = ({ 
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [pending, startTransition] = useTransition();
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    });
    
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState< "correct" | "wrong" | "none" >("none");
    
    const challenge = challenges[activeIndex];
    const options = challenge?.challengesOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };
    
    const onSelect = (id: number) => {
        if (status !== "none") return;
        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return; 

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        const correctOption = options.find((option) => option.correct);

        if (!correctOption){
            return;
        }

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                 .then((response) => {
                    if (response?.error === "hearts") {
                        console.error("Missing hearts")
                        return; 
                    }
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length)

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                 })
                 .catch(() => toast.error("Ceva nu a mers bine. Te rugăm să încerci din nou.") )
            })
        } else {
            startTransition(() => {
                ReduceHearts(challenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        console.error("Missing hearts");
                        return;
                    }

                    setStatus("wrong");

                    if (!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                })
                .catch(() => toast.error("Ceva nu a mers bine. Te rugăm să încerci din nou."))
            })
        }
    };

    // Add keyboard event listener
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (status !== "none") return;
            
            const key = event.key;
            const keyNumber = parseInt(key);
            
            // Check if it's a number key and within the range of available options
            if (!isNaN(keyNumber) && keyNumber >= 1 && keyNumber <= options.length) {
                const optionIndex = keyNumber - 1;
                const selectedOptionId = options[optionIndex]?.id;
                
                if (selectedOptionId) {
                    onSelect(selectedOptionId);
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [options, status]);

    // Check if we've completed all challenges
    if (!challenge) {
        return (
            redirect("./learn")
        );
    }
        
    const title = challenge.type === "ASSIST"
    ? "Alege varianta corectă"
    : challenge.question;
    
    return(
        <>
        <Header 
         hearts={hearts}
         percentage={percentage}
         hasActiveSubscription={!!userSubscription?.isActive}
         />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                      {title}
                    </h1>
                    <div>
                      {challenge.type === "ASSIST" && (
                        <QuestionBubble question={challenge.question} />
                      )}
                      <Challenge
                        options={options}
                        onSelect={onSelect}
                        status={status}
                        selectedOption={selectedOption}
                        disabled={pending}
                        type={challenge.type}
                      />
                    </div>
                </div>
            </div>
         </div>
         <Footer 
         disabled={pending || !selectedOption}
         status={status}
         onCheck={onContinue}
         />
        </>
    )
};