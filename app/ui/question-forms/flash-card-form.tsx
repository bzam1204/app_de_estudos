'use client'
import React, { useEffect } from "react";
import dynamic from 'next/dynamic';

const Tiptap = dynamic(() => import('../text-editor/tip-tap'), { ssr: false });

import StarterKit from '@tiptap/starter-kit';
import clsx from "clsx";
import { SubmitButton } from "./summary-form";
import { CirclePlus } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { createQuestion } from "@/app/lib/actions";
import { useEditor, EditorContent } from '@tiptap/react';
import { motion } from "framer-motion";


const SubmitBtn = () => {
    const { pending } = useFormStatus();

    return (
        <SubmitButton Icon={CirclePlus} label="Criar Flashcard" _pending={pending} />
    );
};

const FlashCardForm = () => {
    const [state, formAction] = useFormState(createQuestion, undefined);
    const [frontContent, setFrontContent] = React.useState('Escreva o conteúdo da frente do cartão aqui');
    const [backContent, setBackContent] = React.useState('Escreva a explicação do cartão aqui');

    const FlashCardMockUpTemplate = () => {
        const [isFlipped, setIsFlipped] = React.useState(false);
        const [isAnimating, setIsAnimating] = React.useState(false);

        function handleFlip() {
            if (!isAnimating) {
                setIsAnimating(true);
                setIsFlipped(!isFlipped);
            }
        }

        // Editor instance for rendering content
        const frontEditor = useEditor({
            extensions: [StarterKit],
            content: frontContent,

            editable: false, 
            immediatelyRender: false,
        });

        const backEditor = useEditor({
            extensions: [StarterKit],
            content: backContent,
            editable: false, 
            immediatelyRender: false,
        });

        const flipCardTailwind = clsx(
            "rounded-md p-4 cursor-pointer w-full h-full absolute bg-gray-200",

        )



        return (
            <div className="flex items-center justify-center  w-full grow ">
                <div className="flip-card  flex justify-center items-center w-full max-w-screen-sm h-[25rem] drop-shadow-sm " onClick={handleFlip}>

                    {/* Apresentação do Conteúdo com TipTap */}
                    <motion.div
                        initial={false}
                        className=" flip-card-inner w-full h-full"
                        animate={{ rotateY: isFlipped ? 180 : 360 }}
                        transition={{ duration: 0.6, animationDirection: 'normal' }}
                        onAnimationComplete={() => setIsAnimating(false)}
                    >
                        <div className={flipCardTailwind + ' flip-card-front '}>
                            <EditorContent content={frontContent} editor={frontEditor} />
                        </div>


                        <div className={flipCardTailwind + ' flip-card-back overflow-y-scroll'}>
                            <EditorContent content={backContent} editor={backEditor} />
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    };

    useEffect(() => console.log(frontContent), [frontContent])

    return (
        <div className="flex justify-between items-start">
            <form action={formAction} className="flex flex-col w-full grow">
                <input hidden readOnly type="text" name="userId" value="clz3g43fz00049moixkx337j8" />
                <input hidden readOnly type="text" name="typeId" value="c8021e52-0109-4c2f-bf9d-32817fcdf792" />
                <input hidden readOnly type="text" name="body" value={frontContent} />
                <input hidden readOnly type="text" name="explanation" value={backContent} />
                <p>Frente do cartão</p>
                <Tiptap onContentChange={setFrontContent} content={frontContent} />
                <p>Explicação do cartão</p>
                <Tiptap onContentChange={setBackContent} content={backContent} />
                <SubmitBtn />
                {state?.message && <p className="mt-2 text-sm text-green-500">{state.message}</p>}
            </form>
            <FlashCardMockUpTemplate />
        </div>
    );
};
export default FlashCardForm;