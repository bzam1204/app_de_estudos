'use client'
import { ArrowPathIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Question } from '@prisma/client';
import React from 'react';
import { deleteQuestion } from '../lib/actions';
import { useFormState } from 'react-dom';

const QuestionCardReadOnly: React.FC<Question> = ({ id, body }) => {
    const [state, formAction, isPending] = useFormState(deleteQuestion, undefined)

    const handleDeleteClick = (event: any) => {
        const isConfirmed = window.confirm("Tem certeza de que deseja deletar esta questão?");
        if (!isConfirmed) {
            event.preventDefault();
        }
    };

    return (
        <div
            className="flex relative flex-row bg-transparent gap-4 w-full justify-between max-w-screen-md border-transparent border-x-8 border-black transition-all duration-200 hover:border-x-0 hover:border-gray-200 hover:bg-white p-4 hover:rounded-r hover:border-l-amber-400 hover:border-l-8 hover:pl-6 hover:drop-shadow-md"
        >
            <p>{body}</p>
            <form action={formAction} className='flex flex-col gap-3 justify-around'>
                <input type="text" name='id' readOnly hidden value={id} />
                <button type='submit' aria-label={"delete question"} onClick={handleDeleteClick}>
                    {isPending ?
                        <ArrowPathIcon className='animate-spin' width={20} /> :
                        <TrashIcon width={20} />}
                </button>
                {/* <button aria-label={"edit question"}>
                    <PencilSquareIcon width={20}/>
                </button> */}
            </form>
        </div>
    );
}


export default QuestionCardReadOnly;