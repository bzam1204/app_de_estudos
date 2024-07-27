"use client";
import { QuestionTypeName } from "@prisma/client";
import React from "react";

interface Props {
    onSelect: React.Dispatch<React.SetStateAction<QuestionTypeName>>;
}

const QuestionTypeSelector = ({ onSelect }: Props) => {
    return (
        <select onChange={(e) => onSelect(e.target.value as QuestionTypeName)}>
            {Object.keys(QuestionTypeName).map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default QuestionTypeSelector;
