'use client'
import renderQuestionForm from '@/app/ui/question-form-templates/render-question-form';
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
        <div>
            {renderQuestionForm(type)}
        </div>
    );
};

export default MyComponent;