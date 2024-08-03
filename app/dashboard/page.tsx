import React, { Suspense } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import PendingItems from '../ui/pending-items';
import { inter } from '../ui/fonts';


export default function Page() {
    return (
        <div className={`flex justify-center items-center ${inter.className}`}>
            <Suspense fallback={<ArrowPathIcon className='animate-spin' width={20} />}>
                <PendingItems />
            </Suspense>
        </div>
    );
}