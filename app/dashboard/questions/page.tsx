import Questions from '@/app/ui/questions';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import React, { Suspense } from 'react';

const Page: React.FC = async  () => {
    return (
        <div className='flex justify-center items-center'>
            <Suspense fallback={<ArrowPathIcon className='animate-spin' width={20} />}>
                <Questions />
            </Suspense>
        </div>
    );
};

export default Page;