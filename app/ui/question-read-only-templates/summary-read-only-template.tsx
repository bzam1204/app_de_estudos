import React from 'react';

interface SummaryReadOnlyTemplateProps {
    // Add your props here
    question: any;
    index: number;
    key: number;
}

const SummaryReadOnlyTemplate: React.FC<SummaryReadOnlyTemplateProps> = ({ question, index, key }) => {
    // Add your component logic here

    return (
        <div
            className="flex flex-col bg-transparent gap-4 w-full justify-between max-w-screen-md transition-all  rounded duration-200  p-4  hover:pl-6 hover:drop-shadow-md hover:bg-white hover:border-l-4 hover:border-amber-400"
        >
            <h2 className='text-3xl'>{question.title}</h2>
            <TextReader content={question.body} />
            
        </div>  
    );
};
export default SummaryReadOnlyTemplate;

import TextReader from '../text-editor/text-reader';



