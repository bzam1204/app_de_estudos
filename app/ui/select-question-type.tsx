'use client'

import React, { useEffect, useState } from "react";
import { QuestionType, QuestionTypeName } from "@prisma/client";
import { questionTypesLabels } from "../lib/questionTypesLabels";
import {getQuestionTypes} from "@/app/lib/data";

interface Props {
    selection: QuestionTypeName;
    setSelection: React.Dispatch<React.SetStateAction<QuestionTypeName>>;
}

const SelectQuestionType: React.FC<Props> =  ({ selection, setSelection, }) => {
    const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
    const lang = 'portuguese';

    useEffect(() => {
        const fetchQuestionTypes = async () => {
            try {
                const tipos:QuestionType[] = await getQuestionTypes();
                console.log('types: ',tipos);
                setQuestionTypes(tipos);
            } catch (error) {
                console.error("Error fetching question types:", error);
            }
        };

        fetchQuestionTypes();
    }, []);
    return (
        <select
            value={selection}
            onChange={e => setSelection(e.target.value as QuestionTypeName)}
            className="block w-full px-3 text-gray-800 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        >
            {questionTypesLabels.map(({ questionType, label }) => (
                <option
                    key={questionType}
                    value={questionType}
                    className="text-gray-900"
                >
                    {label[lang]}
                </option>
            ))}
        </select>
    )
}

export default SelectQuestionType;