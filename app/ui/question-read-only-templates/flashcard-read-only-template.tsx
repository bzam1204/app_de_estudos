'use client'
import React from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useFormState } from "react-dom";
import { createQuestion } from "@/app/lib/actions";


const FlashCardReadOnlyTemplate = ({frontContent, backContent}: {frontContent: string, backContent: string}) => {
    const [state, formAction] = useFormState(createQuestion, undefined);


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

    return (
        <div>
            {/* Apresentação do Conteúdo com TipTap */}
            <div className="mt-8">
                <h2 className="text-xl font-bold">Conteúdo do Cartão</h2>
                <div className="mt-4">
                    <h3 className="font-semibold">Frente:</h3>
                    <EditorContent content={frontContent} editor={frontEditor} />
                </div>
                <div className="mt-4">
                    <h3 className="font-semibold">Explicação:</h3>
                    <EditorContent content={backContent} editor={backEditor} />
                </div>
            </div>
        </div>
    );
};

export default FlashCardReadOnlyTemplate;