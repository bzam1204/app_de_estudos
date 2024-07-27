import { createQuestion } from "@/app/lib/actions";
import React, { useActionState } from "react";

type QuestionState = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

const TrueFalseForm: React.FC = () => {
    const initialState: QuestionState = { message: null, errors: {} };

    const [state, formAction] = useActionState(createQuestion, initialState);

    1
    return (
        <div className="flex justify-center items-center ">
            <form
                action={formAction}
                className="bg-white shadow-md rounded flex flex-col px-8 pt-6 pb-8 mb-4 gap-4"
            >
                <input hidden readOnly type="text" name="userId" value={'clz3g43fz00049moixkx337j8'} />
                <input hidden readOnly type="text" name="typeId" value={'ac2b1e9b-1b00-4cd2-82d8-fd10dfa4ee6f'} />
                <input hidden readOnly type="text" name="title" />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Questão:
                    <textarea
                        name="body"
                        rows={10}
                        cols={50}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </label>
                <label className=" text-gray-700 text-sm font-bold mb-2 flex flex-col gap-2">
                    Resposta:
                    <select
                        name="correctAnswer"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="true">Certa</option>
                        <option value="false">Errada</option>
                    </select>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Explicação:
                    <textarea
                        name="explanation"
                        rows={8}
                        cols={50}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </label>

                <button type="submit" className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75" >
                    {"Criar Questão"}
                </button>
                {state.message && <p className="mt-2 text-sm text-green-500">{state.message}</p>}
            </form>
        </div>
    );
};

export default TrueFalseForm;
