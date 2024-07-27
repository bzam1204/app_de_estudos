import QuestionForm from '@/app/ui/question-form';
import React from 'react';

const Page: React.FC = () => {
//create var string
  

    return (
        <div className="flex flex-col gap-6 justify-start items-center h-screen">
            <QuestionForm />      
        </div>
    );
};

export default Page;