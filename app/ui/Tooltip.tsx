import React from 'react';
import {Simulate} from "react-dom/test-utils";
import mouseLeave = Simulate.mouseLeave;

interface Props {
    className?: string;
    text?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

function Tooltip({className = '', text = '', onMouseEnter, onMouseLeave}: Props) {
    return (
        <div
            onMouseLeave={(event) => {
                if (onMouseLeave) {
                    onMouseLeave(event);
                }
            }}
            onMouseEnter={(event) => {
                if (onMouseEnter) {
                    onMouseEnter(event)
                }
            }}
            className={`${className} text-xl p-4 absolute h-fit w-full max-w-xl right- bg-white border-x-amber-400 border-x-8 rounded drop-shadow-lg `}
        >
            {text && (text)}
        </div>
    );
}

export default Tooltip;