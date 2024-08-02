'use client'
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Question, QuestionType } from "@prisma/client";
import { createOrUpdateFibonacciLog } from "../../lib/actions";

interface Props {
    question: Question,
    questionType: QuestionType
}


const TrueFalseCardToAnswer: React.FC<Props> = ({ question, questionType }) => {
    const [result, setResult] = useState<Boolean | null>(null)
    const [givenAnswer, setGivenAnswer] = useState<Boolean | null>(null)
    const trueButtonRef = React.useRef<HTMLButtonElement>(null)
    const falseButtonRef = React.useRef<HTMLButtonElement>(null)

    async function handleAnswerQuestion(givenAnswer: any,) {
        const correctAnswer = question.correctAnswer
        const result = givenAnswer === correctAnswer
        if(result !== null && result === true) {
            trueButtonRef.current?.classList.add('bg-green-800')
        }
        if (result === true) await createOrUpdateFibonacciLog(question.id, question.userId, result)
        return result;
    }

    return (
        <div
            className="flex relative flex-row bg-transparent gap-4 w-full justify-between max-w-screen-md border-transparent border-x-8 border-black transition-all duration-200 hover:border-x-0 hover:border-gray-200 hover:bg-white p-4 hover:rounded-r hover:border-l-amber-400 hover:border-l-8 hover:pl-6 hover:drop-shadow-md"
        >

            <p>{question.body}</p>
            <div className='flex flex-col gap-3 justify-around'>

                <button
                className="p-1  justify-center  rounded-full  flex gap-2 font-bold transition border-2 rounded"
                    ref={trueButtonRef}
                    type="submit"
                    aria-label={"answer question"}
                    onClick={() => {
                        handleAnswerQuestion(true).then(res => setResult(res))
                        
                    }}
                >

                    <CheckIcon width={20} />
                </button>
                <button
                className="p-1  justify-center  rounded-full  flex gap-2 font-bold transition border-2 rounded"
                    ref={falseButtonRef}
                    type="submit"
                    aria-label={"answer question"}
                    onClick={() => {
                        handleAnswerQuestion(false).then(res => setResult(res))

                    }}
                >
                    <XMarkIcon width={20} />
                    {result !== null && (result ? <p>acertou</p> : <p>errou</p>)}
                </button>
            </div>

        </div>
    );
}

export default TrueFalseCardToAnswer;