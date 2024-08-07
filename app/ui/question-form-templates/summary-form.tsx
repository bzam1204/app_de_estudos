import React from "react";
import TextEditor from "../text-editor";
import { useFormState, useFormStatus } from "react-dom";
import Button from "../button";
import { createQuestion } from "@/app/lib/actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button pending={pending} />
    );
}

const SummaryForm = () => {
    const [state, formAction] = useFormState(createQuestion, undefined);

    return (
        <form action={formAction}>
            <h1>SummaryForm</h1>
            <TextEditor  />
            <SubmitButton  />
        </form>
    );
};
export default SummaryForm;
