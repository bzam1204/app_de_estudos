import React, { Suspense } from 'react';
import QuestionListForToday from '../ui/question-list-for-today';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import PendingItems from '../ui/pending-items';

export default function Page() {
    return (
        <div className='flex justify-center items-center'>
            <Suspense fallback={<ArrowPathIcon className='animate-spin' width={20} />}>
                <PendingItems />
            </Suspense>
        </div>
    );
}