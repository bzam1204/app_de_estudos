'use client'
import React, { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from "framer-motion";
import clsx from "clsx";
import { SubmitButton } from "./true-false-read-only-template";
import { useFormState } from "react-dom";
import { deleteQuestion } from "@/app/lib/actions";
import { Question } from "@prisma/client";


const FlashCardReadOnlyTemplate = ({ question }: { question: Question }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [showDeleteIcon, setShowDeleteIcon] = useState<Boolean>(false)
    const [state, formAction] = useFormState(deleteQuestion, undefined)

    function handleFlip() {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
        }
    }

    function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        const isConfirmed = window.confirm("Tem certeza de que deseja deletar esta questão?");
        if (!isConfirmed) {
            event.preventDefault();
        }
        setShowDeleteIcon(true)
    };

    // Editor instance for rendering content
    const frontEditor = useEditor({
        extensions: [StarterKit],
        content: question.body,
        editable: false, // Make it non-editable
    });

    const backEditor = useEditor({
        extensions: [StarterKit],
        content: question.explanation,
        editable: false, // Make it non-editable
    });

    const flipCardTailwind = clsx(
        "rounded-md p-4 cursor-pointer w-full h-full absolute bg-gray-200 ",
    )

    return (
        <div className="flex items-center justify-center  w-full gap-8 "
            onMouseEnter={() => setShowDeleteIcon(true)}
            onMouseLeave={() => setShowDeleteIcon(false)}>
            <div className='grow'></div>
            <div className="flip-card   flex justify-center items-center w-full max-w-screen-sm h-[25rem] drop-shadow-sm " onClick={handleFlip}>

                <motion.div
                    initial={false}
                    className=" flip-card-inner w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 360 }}
                    transition={{ duration: 0.2, animationDirection: 'normal' }}
                    onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div className={flipCardTailwind + ' flip-card-front hover:bg-amber-300 transition-all'}>
                        <EditorContent content={question.body} editor={frontEditor} />
                    </div>


                    <div className={flipCardTailwind + ' flip-card-back  overflow-y-auto default-scrollbar'}>
                        <EditorContent content={question.explanation ?? ""} editor={backEditor} />
                    </div>
                </motion.div>
                <div className='grow'></div>
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

export default FlashCardReadOnlyTemplate;