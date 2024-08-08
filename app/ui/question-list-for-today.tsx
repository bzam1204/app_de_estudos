import React from "react";
import TrueFalseCardToAnswer from "./question-to-answer-templates/true-false-card-to-answer";
import { getQuestionsForToday } from "@/app/lib/data";
import RenderQuestionCard from "./question-to-answer-templates/render-question-card";

const QuestionListForToday: React.FC = async () => {
    const todaysQuestionList = await getQuestionsForToday('dashboard/todays-list')

    return (
        <div className='flex flex-col gap-4 p-4  justify-center items-center w-screen max-w-screen-lg'>
            {todaysQuestionList && todaysQuestionList.map((log, index) => {
                return <RenderQuestionCard key={index} index={index} question={log.question} selection={log.QuestionType.name} />;
            })}
        </div>
    )

}

export default QuestionListForToday;