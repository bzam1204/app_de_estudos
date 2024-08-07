'use client'
import React from "react";
import { QuestionTypeName } from "@prisma/client";
import { questionTypesLabels } from "../lib/questionTypesLabels";

interface Props {
    selection: QuestionTypeName;
    setSelection: React.Dispatch<React.SetStateAction<QuestionTypeName>>;
}

const SelectQuestionType: React.FC<Props> = ({ selection, setSelection, }) => {
    const lang = 'portuguese';

    return (
        <select
            value={selection}
            onChange={e => setSelection(e.target.value as QuestionTypeName)}
            className="block w-full px-3 text-gray-800 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        >
            {questionTypesLabels.map(({ name, label }, index) => (
                <option
                    key={index}
                    value={name}
                    className="text-gray-900"
                >
                    {label[lang]}
                </option>
            ))}
        </select>
    )
}

export default SelectQuestionType;