'use client'
import React from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from "framer-motion";
import clsx from "clsx";
import { createOrUpdateFibonacciLog } from "@/app/lib/actions";
import { Question } from "@prisma/client";


const FlashCardToAnswerTemplate = ({ frontContent, backContent, question }: { frontContent: string, backContent: string, question: Question }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [reviewed, setReviewed] = React.useState(false);

    async function handleFlip() {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
        }
        if (!reviewed) {
            try {
                await createOrUpdateFibonacciLog(question.id, question.userId).then(() => setTimeout(() => setReviewed(true), 700));
            } catch (error) {
                console.error("Error occurred while creating/updating Fibonacci log:", error);
            }

        }
    }

    // Editor instance for rendering content
    const frontEditor = useEditor({
        extensions: [StarterKit],
        content: frontContent,
        editable: false, // Make it non-editable
    });

    const backEditor = useEditor({
        extensions: [StarterKit],
        content: backContent,
        editable: false, // Make it non-editable
    });

    const flipCardTailwind = clsx(
        "rounded-md p-4 cursor-pointer w-full h-full absolute",
        reviewed ? 'bg-amber-200  ' : 'bg-gray-200'
    )

    return (
        <div className="flex items-center justify-center  w-full ">
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

export default FlashCardToAnswerTemplate;