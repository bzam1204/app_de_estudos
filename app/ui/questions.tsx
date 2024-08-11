import { Question, QuestionType } from '@prisma/client';
import React from 'react';
import { getQuestions } from "@/app/lib/data";
import RenderReadOnlyQuestion from './question-read-only-templates/render-read-only-question';

type QuestionsWithType = Question & { type: QuestionType }

const Questions: React.FC = async () => {
    const questions: QuestionsWithType[] = await getQuestions('dashboard/questions')
    return (
        <div className='flex flex-col gap-4 py-4 justify-center items-center w-full'>
            {questions.length > 0 ? questions.map((question, index) => {
                return (
                    <RenderReadOnlyQuestion key={index} question={question} index={index} selection={question.type.name} />
                )
            }) : <p>No questions found</p>}
        </div>
    );
};

export default Questions;