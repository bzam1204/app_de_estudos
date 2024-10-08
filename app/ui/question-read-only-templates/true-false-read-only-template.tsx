'use client'
import { deleteQuestion } from '@/app/lib/actions';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Question } from '@prisma/client';
import React from 'react';

import { useFormState, useFormStatus } from 'react-dom';

export interface SubmitButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export function SubmitButton({ onClick, className }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button className={className} disabled={pending} type='submit' aria-label={"delete question"} onClick={onClick}>
            {pending ?
                <ArrowPathIcon className='animate-spin' width={20} /> :
                <TrashIcon width={20} />}
        </button>
    );
}

interface QuestionProps {
    question: Question
}

export function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
    const isConfirmed = window.confirm("Tem certeza de que deseja deletar esta questão?");
    if (!isConfirmed) {
        event.preventDefault();
    }
};

const TrueFalseReadOnlyTemplate: React.FC<QuestionProps> = ({ question }) => {
    const [state, formAction] = useFormState(deleteQuestion, undefined)



    return (
        <div
            className="flex relative flex-row bg-transparent gap-4 w-full justify-between max-w-screen-md border-transparent border-x-8 border-black transition-all duration-200 hover:border-x-0 hover:border-gray-200 hover:bg-white p-4 hover:rounded-r hover:border-l-amber-400 hover:border-l-8 hover:pl-6 hover:drop-shadow-md"
        >
            <p>{question.body}</p>
            <form action={formAction} className='flex flex-col gap-3 justify-around'>
                <input type="text" name='id' readOnly hidden value={question.id} />
                <SubmitButton onClick={handleDeleteClick} />
                {/* <button type='submit' aria-label={"delete question"} onClick={handleDeleteClick}>
                    {pending ?
                        <ArrowPathIcon className='animate-spin' width={20} /> :
                        <TrashIcon width={20} />}
                </button> */}
                {/* <button aria-label={"edit question"}>
                    <PencilSquareIcon width={20}/>
                </button> */}
            </form>
        </div>
    );
}


export default TrueFalseReadOnlyTemplate;