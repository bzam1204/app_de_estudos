'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormState, useFormStatus } from 'react-dom';
import { createOrUpdateFibonacciLog, deleteQuestion } from '@/app/lib/actions';
import { ArrowPathIcon, BookOpenIcon, CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const TextReader = dynamic(() => import('../../ui/text-editor/text-reader'), { ssr: false });
interface SummaryReadOnlyTemplateProps {
    question: any;
    key: number;
}

export interface SubmitButtonProps {
    answerButtonPressed: boolean;
    isSummaryRead: Boolean;
}


export function SubmitButton({ answerButtonPressed, isSummaryRead }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button disabled={answerButtonPressed} className={clsx('w-fit absolute h-fit p-1 ${shadowGen} justify-center border-transparent   rounded-full px-2  flex gap-2 font-bold text-gray-700 transition hover:border-amber-500 border-2 hover:bg-amber-500 hover:text-white active:border-amber-500 active:text-amber-500 active:bg-white', isSummaryRead ? 'hover:drop-shadow-md bg-gray-50 pointer-events-none' : 'drop-shadow-md bg-white ')} type='submit' >

            {pending ? <>
                <ArrowPathIcon className='animate-spin' width={20} />
                <p>Ler</p>
            </> :
                isSummaryRead ? (
                    <>
                        <CheckIcon width={20} />
                        <p>Lida</p>
                    </>
                ) : (
                    <>
                        <BookOpenIcon width={20} />
                        <p>Ler</p>
                    </>
                )}

        </button>
    );
}

const SummaryReadOnlyTemplate: React.FC<SummaryReadOnlyTemplateProps> = ({ question, key }) => {
    const [state, formAction] = useFormState(handleAnswerQuestion, undefined)
    const [showDeleteIcon, setShowDeleteIcon] = useState<Boolean>(false)
    const [answerButtonPressed, setAnswerButtonPressed] = useState<boolean>(false)
    const [isSummaryRead, setIsSummaryRead] = useState<Boolean>(false)

    async function handleAnswerQuestion() {
        try {
            setAnswerButtonPressed(true);

            await createOrUpdateFibonacciLog(question.id, question.userId);
            setIsSummaryRead(true);
        } catch (error) {
            console.error('Erro ao marcar a questão como lida:', error);
            setAnswerButtonPressed(false);
            setIsSummaryRead(false);
        }
    }

    return (
        <div className={clsx("w-full h-fit flex justify-center items-center gap-4", isSummaryRead && "pointer-events-none")}
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
                {(showDeleteIcon || isSummaryRead || answerButtonPressed) && (
                    <SubmitButton answerButtonPressed={answerButtonPressed} isSummaryRead={isSummaryRead} />
                )}
            </form>
        </div>
    );
};
export default SummaryReadOnlyTemplate;




