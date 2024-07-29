import React from "react";
import QuestionCardToAnswer from "./question-card-to-answer";
import {getQuestionsForToday} from "@/app/lib/data";

const QuestionListForToday: React.FC = async () => {
    const todaysQuestionList = await getQuestionsForToday('dashboard/todays-list')

    return (
        <div className='flex flex-col gap-4 py-4 justify-center items-center w-screen max-w-screen-md'>
            {todaysQuestionList.map((log, index) => {
                return <QuestionCardToAnswer key={index} question={log.question} questionType={log.QuestionType} />;
            })}
        </div>
    )

}

export default QuestionListForToday;