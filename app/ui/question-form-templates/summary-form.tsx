import React from "react";
import TextEditor from "../text-editor";
import { useFormState, useFormStatus } from "react-dom";
import Button from "../button";
import { createQuestion } from "@/app/lib/actions";
import { BookmarkIcon } from "@heroicons/react/24/outline";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button label="Criar Resumo" pending={pending} Icon={BookmarkIcon} />
    );
}

const SummaryForm = () => {
    const [state, formAction] = useFormState(createQuestion, undefined);

    return (
        <form action={formAction}>
            <TextEditor  />
            <SubmitButton  />
        </form>
    );
};
export default SummaryForm;
