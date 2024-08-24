import React from "react";
import { getQuestionsForToday } from "../lib/actions";
import QuestionCardReadOnly from "./question-card-read-only";
import { Question } from "@prisma/client";
import QuestionCardToAnswer from "./question-card-to-answer";

const QuestionListForToday: React.FC = async () => {
    const todaysQuestionList = await getQuestionsForToday()

    return (
        <div className='flex flex-col gap-4 py-4 justify-center items-center w-screen max-w-screen-md'>
            {todaysQuestionList.map((log, index) => {
                return <QuestionCardToAnswer key={index} question={log.question} questionType={log.QuestionType} />;
            })}
        </div>
    )

}

export default QuestionListForToday;