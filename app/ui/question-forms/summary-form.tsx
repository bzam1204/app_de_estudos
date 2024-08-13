import React from "react";
import TextEditor from "../text-editor/text-editor";
import { useFormState, useFormStatus } from "react-dom";
import { createQuestion } from "@/app/lib/actions";
import { inter } from "../fonts";
import { Button } from "../button";
import { BookCheck, BookUp, LoaderCircle, LucideProps } from 'lucide-react'

export function SubmitButton({ _pending, label, Icon }: { _pending?: Boolean, label: string, Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> }) {
    if (typeof _pending !== 'undefined') {
        return (
            <Button className="gap-2 w-fit" size='lg'>
                {_pending ? <LoaderCircle className="animate-spin" size={16} /> : <Icon size={16} />} {label}

            </Button>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pending } = useFormStatus();
    return (
        <Button className="gap-2 w-fit text-md" size='lg'>
            {pending ? <LoaderCircle className="animate-spin" size={18} /> : <BookCheck size={18} />} Criar Resumo

        </Button>
    );

}

const SummaryForm = () => {
    const [textBody, setTextBody] = React.useState('');
    const [state, formAction] = useFormState(createQuestion, undefined);

    return (
        <form action={formAction} className="flex flex-col gap-4 h-full w-2/3 self-center">
            <input type="text" name="title" placeholder="Título do Meu Novo Resumo" className={`bg-transparent text-3xl text-gray-800 ${inter.className} border-gray-300 p-2 focus:border-amber-400 outline-none rounded`} />
            <input hidden readOnly type="text" name="userId" value={'clz3g43fz00049moixkx337j8'} />
            <input hidden readOnly type="text" name="typeId" value={'4f7eb0f6-86e7-488e-9b9c-05e373b17553'} />
            <input hidden type="text" name="body" value={textBody} />
            <input hidden type="text" name="explanation" value={'nonis'} />
            <TextEditor ON_KEY_UP={(e) => {
                setTextBody(e.target.innerHTML);
            }} />

            <SubmitButton Icon={BookUp} label="Criar Resumo" />
            {state?.message && <p className="mt-2 text-sm text-green-500">{state.message}</p>}

        </form>
    );
};
export default SummaryForm; 