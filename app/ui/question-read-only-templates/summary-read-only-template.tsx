'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormState } from 'react-dom';
import { deleteQuestion } from '@/app/lib/actions';
import { SubmitButton } from './true-false-read-only-template';

const TextReader = dynamic(() => import('../../ui/text-editor/text-reader'), { ssr: false });
interface SummaryReadOnlyTemplateProps {
    question: any;
    key: number;
}



const SummaryReadOnlyTemplate: React.FC<SummaryReadOnlyTemplateProps> = ({ question, key }) => {
    const [state, formAction] = useFormState(deleteQuestion, undefined)
    const [showDeleteIcon, setShowDeleteIcon] = useState<Boolean>(false)

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        const isConfirmed = window.confirm("Tem certeza de que deseja deletar esta questão?");
        if (!isConfirmed) {
            event.preventDefault();
        }
        setShowDeleteIcon(true)
    };

    return (
        <div className="w-full h-fit flex justify-center items-center gap-4"
            onMouseEnter={() => setShowDeleteIcon(true)}
            onMouseLeave={() => setShowDeleteIcon(false)}
        >
            <div className='grow'></div>
            <div
                key={key}
                className="flex flex-col bg-gray-50  gap-4 w-full justify-between max-w-screen-md transition-all  hover:rounded-r duration-200  p-4 border-gray-300 hover:border-amber-400 border-l-2 hover:drop-shadow-md hover:bg-white "
            >
                <h2 className='text-3xl'>{question.title}</h2>
                <TextReader content={question.body} />

            </div>
            <form action={formAction} className='flex flex-col gap-3 justify-around grow'>
                <input type="text" name='id' readOnly hidden value={question.id} />
                {showDeleteIcon && (
                    <SubmitButton className=' w-fit absolute h-fit p-1 drop-shadow-md justify-center border-transparent  bg-white  rounded-full  flex gap-2 font-bold text-gray-700 transition hover:border-amber-500 border-2 hover:bg-amber-500 hover:text-white active:border-amber-500 active:text-amber-500 active:bg-white' onClick={handleDeleteClick} />
                )}
            </form>
        </div>
    );
};
export default SummaryReadOnlyTemplate;




