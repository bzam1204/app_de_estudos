import React from "react";
import Tiptap from "../text-editor/tip-tap";
import { Button } from "../button";
import { SubmitButton } from "./summary-form";
import { CirclePlus } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { createQuestion } from "@/app/lib/actions";

const SubmitBtn = () => {
    const { pending } = useFormStatus();

    return (
        <SubmitButton Icon={CirclePlus} label="Criar Flashcard" _pending={pending} />
    );
};

const FlashCardForm = () => {
    const [state, formAction] = useFormState(createQuestion, undefined);
    const [frontContent, setFrontContent] = React.useState('');
    const [backContent, setBackContent] = React.useState('');
  
    return (
      <div>
        <form action={formAction}>
          <input hidden readOnly type="text" name="userId" value="clz3g43fz00049moixkx337j8" />
          <input hidden readOnly type="text" name="typeId" value="c8021e52-0109-4c2f-bf9d-32817fcdf792" />
          <input hidden type="text" name="body" value={frontContent} />
          <input hidden type="text" name="explanation" value={backContent} />
          <p>Frente do cartão</p>
          <Tiptap onContentChange={setFrontContent} />
          <p>Explicação do cartão</p>
          <Tiptap onContentChange={setBackContent} />
                <SubmitBtn />
                {state?.message && <p className="mt-2 text-sm text-green-500">{state.message}</p>}
            </form>
        </div>
    );
};
export default FlashCardForm;