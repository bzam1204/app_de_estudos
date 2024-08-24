import React, { Suspense } from 'react';
import QuestionListForToday from '../ui/question-list-for-today';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
    // Define the props for your component here
}

const Page: React.FC<Props> = (props) => {
    // Add your component logic here

    return (
        <div className='flex justify-center items-center'>
            <Suspense fallback={<ArrowPathIcon className='animate-spin' width={20} />}>
                <QuestionListForToday />
            </Suspense>
        </div>
    );
};

export default Page;