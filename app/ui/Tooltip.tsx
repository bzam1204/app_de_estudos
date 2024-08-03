import React from 'react';
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
            className={`${className} delay-1000 text-sm p-4 absolute right-0 top-0 h-fit w-full max-w-xl bg-white border-x-amber-400 border-x-8 rounded drop-shadow-lg `}
        >
            {text && (text)}
        </div>
    );
}

export default Tooltip;