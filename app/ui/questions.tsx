import { Question, QuestionType } from '@prisma/client';
import React from 'react';
import QuestionCardReadOnly from './question-card-read-only';
import { getQuestions } from "@/app/lib/data";
import RenderReadOnlyQuestion from './question-read-only-templates/render-read-only-question';

type QuestionsWithType = Question & { type: QuestionType }

const Questions: React.FC = async () => {
    const questions: QuestionsWithType[] = await getQuestions('dashboard/questions')
    console.log(questions)
    return (
        <div className='flex flex-col gap-4 py-4 justify-center items-center w-screen max-w-screen-md'>
            {questions.length > 0 ? questions.map((question, index) => {
                return (
                    <RenderReadOnlyQuestion key={index} question={question} index={index} selection={question.type.name} />
                )
            }) : <p>No questions found</p>}
        </div>
    );
};

export default Questions;