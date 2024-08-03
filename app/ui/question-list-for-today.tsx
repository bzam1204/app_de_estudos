import React from "react";
import TrueFalseCardToAnswer from "./question-to-answer-templates/true-false-card-to-answer";
import {getQuestionsForToday} from "@/app/lib/data";

const QuestionListForToday: React.FC = async () => {
    const todaysQuestionList = await getQuestionsForToday('dashboard/todays-list')

    return (
        <div className='flex flex-col gap-4 p-4  justify-center items-center w-screen max-w-screen-lg'>
            {todaysQuestionList.map((log, index) => {
                return <TrueFalseCardToAnswer key={index} index={index} question={log.question} questionType={log.QuestionType} />;
            })}
        </div>
    )

}

export default QuestionListForToday;