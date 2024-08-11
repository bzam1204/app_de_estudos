'use client'
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { Question, QuestionType } from "@prisma/client";
import Tooltip from "../Tooltip";
import { createOrUpdateFibonacciLog } from "@/app/lib/actions";

interface Props {
    question: Question,
    index: number
}

const TrueFalseCardToAnswer: React.FC<Props> = ({ question, index }) => {
    const [result, setResult] = useState<Boolean | null>(null)
    const [givenAnswer, setGivenAnswer] = useState<Boolean | null>(null)
    const [showExplanation, setShowExplanation] = useState<Boolean>(false)
    const [showTooltipIcon, setShowTooltipIcon] = useState<Boolean>(false)
    const trueButtonRef = React.useRef<HTMLButtonElement>(null)
    const falseButtonRef = React.useRef<HTMLButtonElement>(null)
    const containerButtonRef = React.useRef<HTMLDivElement>(null)
    const indexRef = React.useRef<HTMLDivElement>(null)

    async function handleAnswerQuestion(givenAnswer: boolean,) {
        const correctAnswer = question.correctAnswer
        const isCorrect = givenAnswer === correctAnswer
        setGivenAnswer(givenAnswer)
        setResult(isCorrect)
         if (isCorrect === true) await createOrUpdateFibonacciLog(question.id, question.userId, isCorrect)
    }

    const applyStyles = (
        buttonRef: React.RefObject<HTMLButtonElement>,
        isCorrect: boolean,
        otherButtonRef: React.RefObject<HTMLButtonElement>
    ) => {
        const correctClasses = ['bg-green-600', 'text-white', 'border-green-600'];
        const incorrectClasses = ['bg-red-600', 'text-white', 'border-red-600'];
        const classesToAdd = isCorrect ? correctClasses : incorrectClasses;

        buttonRef.current?.classList.add(...classesToAdd);
        otherButtonRef.current!.style.color = "transparent";
        otherButtonRef.current!.style.backgroundColor = "transparent";
    };

      useEffect(() => {
        if (result !== null && givenAnswer !== null) {
            if (givenAnswer === true) {
                applyStyles(trueButtonRef, result === true, falseButtonRef);
            } else {
                applyStyles(falseButtonRef, result === true, trueButtonRef);
            }
            setTimeout(() => {
                setShowExplanation(true)
                setShowTooltipIcon(true)

                setTimeout(() => {
                    setShowExplanation(false)
                    setShowTooltipIcon(false)
                }, 4000);
            }, 1000);

        }
    }, [result, givenAnswer]);

    useEffect(() => {

        if (indexRef !== null && containerButtonRef !== null)
            indexRef.current!.style.height = containerButtonRef.current!.offsetHeight + 'px'
    }, [])

    return (
        <div className="w-full h-fit flex justify-center items-center gap-4"
            ref={containerButtonRef}
            onMouseEnter={() => setShowTooltipIcon(true)}
            onMouseLeave={() => setShowTooltipIcon(false)}>
            <div ref={indexRef} className="flex flex-1 p-4 "><p>{index + 1}</p></div>
            <div
                className="flex relative flex-row bg-transparent gap-4 w-full justify-between max-w-screen-md border-transparent border-x-8  transition-all duration-200 hover:border-x-0 hover:border-gray-200 hover:bg-white p-4 hover:rounded-r hover:border-l-amber-400 hover:border-l-8 hover:pl-6 hover:drop-shadow-md">
                <p>{question.body}</p>
                <div className='flex flex-col gap-4 justify-start'>

                    <button
                        className="p-1  justify-center  rounded-full  flex gap-2 font-bold transition hover:border-gray-200 border-2 border-transparent"
                        ref={trueButtonRef}
                        type="submit"
                        aria-label={"answer question"}
                        onClick={() => {
                            trueButtonRef.current!.style.pointerEvents = "none"
                            falseButtonRef.current!.style.pointerEvents = "none"
                            handleAnswerQuestion(true)

                        }}
                    >

                        <CheckIcon width={20} />
                    </button>
                    <button
                        className="p-1  justify-center  rounded-full  flex gap-2 font-bold transition hover:border-gray-200 border-2 border-transparent"
                        ref={falseButtonRef}
                        type="submit"
                        aria-label={"answer question"}
                        onClick={() => {
                            trueButtonRef.current!.style.pointerEvents = "none"
                            falseButtonRef.current!.style.pointerEvents = "none"
                            handleAnswerQuestion(false)

                        }}
                    >
                        <XMarkIcon width={20} />
                    </button>
                </div>
                {showExplanation && (
                    <Tooltip text={question.explanation} />
                )}

            </div>
            <div className="flex-1">

                {(result !== null && (showTooltipIcon) && (<>

                    <button className={"h-fit p-1 drop-shadow-md justify-center border-transparent  bg-white  rounded-full  flex gap-2 font-bold text-gray-700 transition hover:border-amber-500 border-2 hover:bg-amber-500 hover:text-white active:border-amber-500 active:text-amber-500 active:bg-white"}
                        onMouseEnter={() => setShowExplanation(true)}
                        onMouseLeave={() => setShowExplanation(false)}>
                        <LightBulbIcon className="size-6 inline" />
                    </button>

                </>
                ))}
            </div>
        </div>
    );
}

export default TrueFalseCardToAnswer;