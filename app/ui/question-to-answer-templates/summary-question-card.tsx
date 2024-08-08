import React from 'react';
import TextReader from '../text-reader';

interface SummaryQuestionCardProps {
    question: any;
    index: number;
    key: number;
}

const SummaryQuestionCard: React.FC<SummaryQuestionCardProps> = ({ question }) => {
    // Implement your component logic here

    return (
        <div
            className="flex relative flex-row bg-transparent gap-4 w-full justify-between max-w-screen-md border-transparent border-x-8 border-black transition-all duration-200 hover:border-x-0 hover:border-gray-200 hover:bg-white p-4 hover:rounded-r hover:border-l-amber-400 hover:border-l-8 hover:pl-6 hover:drop-shadow-md"
        >
          <TextReader text={question.body} />
        </div>
    );
};

export default SummaryQuestionCard;