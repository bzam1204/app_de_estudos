import { Question } from '@prisma/client';
import React from 'react';
import QuestionCardReadOnly from './question-card-read-only';
import {getQuestions} from "@/app/lib/data";

const Questions: React.FC = async () => {
    const questions: Question[] = await getQuestions('dashboard/questions')

    return (
        <div className='flex flex-col gap-4 py-4 justify-center items-center w-screen max-w-screen-md'>
            {questions.length > 0 ? questions.map((question, index) => {
                return (
                    <QuestionCardReadOnly key={index} {...question} />
                )
            }) : <p>No questions found</p>}
        </div>
    );
};

export default Questions;