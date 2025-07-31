"use client";
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useEffect, useTransition, useCallback, useMemo } from "react"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { ReduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti"
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type UserSubscription = {
    isActive: boolean;
} | null | undefined;

type Props = {
    initialPercentage: number; 
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengesOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: UserSubscription;
}

export const Quiz = ({ 
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
   const { width, height } = useWindowSize();

   const { open: openHeartsModal } = useHeartsModal();
   const { open: openPracticeModal } = usePracticeModal();

   const hasActiveSubscription = !!userSubscription?.isActive;

   useMount(() => {
        if ( initialPercentage === 100) {
            openPracticeModal();
        }
   });

   const router = useRouter();

   const [finishAudio, , finishControls] = useAudio({ src: "/finish.mp3", autoPlay: false})
    const [
        correctAudio,
        ,
        correctControls
    ] = useAudio({ src: "/correct.wav"});
    const [
        incorrectAudio,
        ,
        incorrectControls
    ] = useAudio({ src: "/incorrect.wav"});
    const [pending, startTransition] = useTransition();
    const [lessontId] = useState(initialLessonId)
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    });
    
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState< "correct" | "wrong" | "none" >("none");
    
    const challenge = challenges[activeIndex];
    const options = useMemo(() => challenge?.challengesOptions ?? [], [challenge]);

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };
    
    const onSelect = useCallback((id: number) => {
        if (status !== "none") return;
        setSelectedOption(id);
    }, [status]);

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
                        openHeartsModal();
                        return; 
                    }
                    correctControls.play();
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
                // Only reduce hearts if user doesn't have active subscription
                if (hasActiveSubscription) {
                    incorrectControls.play();
                    setStatus("wrong");
                } else {
                    ReduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        incorrectControls.play();

                        setStatus("wrong");

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Ceva nu a mers bine. Te rugăm să încerci din nou."))
                }
            })
        }
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (status !== "none") return;
            
            const key = event.key;
            const keyNumber = parseInt(key);
            
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
    }, [options, status, onSelect]);

    useEffect(() => {
        if (!challenge) {
            finishControls.play();
        }
    }, [challenge, finishControls]);

    if (!challenge) {
        return (
            <>
            {finishAudio}
            {correctAudio}
            {incorrectAudio}
            <Confetti 
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            tweenDuration={10000}/>
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center  justify-center h-full">
                    <Image
                    src="/finish.svg"
                    alt="Finish"
                    className="hidden lg:block"
                    height={100}
                    width={100}
                    />
                    <Image
                    src="/finish.svg"
                    alt="Finish"
                    className="block lg:hidden"
                    height={50}
                    width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700"> Excelent! <br />
                    Felicitări, ai terminat lecția!</h1>
                    <div className="flex items-center gap-x-4 w-full">
                       <ResultCard 
                         variant="points"
                         value={challenges.length * 10}
                       />
                       <ResultCard 
                         variant="hearts"
                         value={hearts}
                       />
                    </div>
                </div>
                <Footer
                  lessonId={lessontId}
                  status="completed"
                  onCheck={() => router.push("/learn")} />
            </>
        );
    }

    const title = challenge.type === "ASSIST"
    ? "Alege varianta corectă"
    : challenge.question;
    
    return(
        <>
        {finishAudio}
        {incorrectAudio}
        {correctAudio}
        <Header 
         hearts={hearts}
         percentage={percentage}
         hasActiveSubscription={hasActiveSubscription}
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