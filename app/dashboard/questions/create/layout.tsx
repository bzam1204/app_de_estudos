import QuestionForm from '@/app/ui/question-form';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    // Implement your component logic here

    return (


        <div className='flex flex-col gap-4'>
            <QuestionForm />
            {children}
        </div>




    );
};

export default Layout;