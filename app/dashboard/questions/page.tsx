import Questions from '@/app/ui/questions';
import React, { Suspense } from 'react';

interface Props {
    // Define the props for your component here
}

const Page: React.FC<Props> = async (props) => {
    // Add your component logic here

    return (
        <div className='flex justify-center items-center'>
            <Suspense fallback={<>loading...</>}>
                <Questions />
            </Suspense>
        </div>
    );
};

export default Page;