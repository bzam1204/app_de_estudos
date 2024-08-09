'use client'
import renderQuestionForm from '@/app/ui/question-forms/render-question-form';
import { QuestionTypeName } from '@prisma/client';
import React from 'react';



interface Props {
    params: {
        type: QuestionTypeName;
    };
}

function MyComponent({ params }: Props) {
    const type = params.type;

    return (
        <>
            {renderQuestionForm(type)}
        </>
    );
};

export default MyComponent;