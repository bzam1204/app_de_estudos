import QuestionForm from '@/app/ui/question-form';
import React from 'react';

export default async function Page() {
    return (
        <div className="flex flex-col gap-6 justify-start items-center h-screen">
            <QuestionForm />
        </div>
    );
};

