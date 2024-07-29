import React, { Suspense } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import QuestionListForToday from '@/app/ui/question-list-for-today';

export default function Page() {
    return (
        <div className='flex justify-center items-center'>
            <Suspense fallback={<ArrowPathIcon className='animate-spin' width={20} />}>
                <QuestionListForToday />
            </Suspense>
        </div>
    );
}