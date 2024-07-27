import { Question } from '@prisma/client';
import React from 'react';
import { getQuestions } from '../lib/actions';
import QuestionCardReadOnly from './question-card-read-only';

type Props = {
    // Define the props for your component here
};

const Questions: React.FC<Props> = async (props) => {
    // Implement your component logic here
    const questions: Question[] = await getQuestions()


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