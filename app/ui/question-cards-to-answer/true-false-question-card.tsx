'use client'
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {  CheckIcon } from "@heroicons/react/24/outline";
import { Question, QuestionType } from "@prisma/client";
import { createOrUpdateFibonacciLog } from "../../lib/actions";

interface Props {
    question: Question,
}


const TrueFalseCardToAnswer: React.FC<Props> = ({ question }) => {
    const [result, setResult] = useState<Boolean | null>(null)

    console.log('questão: ',question.body,'|| correct: ', question.correctAnswer)
    async function handleAnswerQuestion(givenAnswer: any, correctAnswer: any) {

        const result = givenAnswer === correctAnswer

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
                    type="submit"
                    aria-label={"answer question"}
                    onClick={() => {
                        handleAnswerQuestion(true, question.correctAnswer).then(res => setResult(res))
                    }}
                >

                    <CheckIcon width={20} />
                </button>
                <button
                    type="submit"
                    aria-label={"answer question"}
                    onClick={() => {
                        handleAnswerQuestion(false, question.correctAnswer).then(res => setResult(res))
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