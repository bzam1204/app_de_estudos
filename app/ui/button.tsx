import { ArrowPathIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ButtonProps {
    pending?: boolean;
}

const Button: React.FC<ButtonProps> = ({ pending }) => {
    return (
        <button
            type="submit"
            className="flex justify-center items-center gap-2 px-4 py-2 bg-amber-500 text-white font-semibold rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
        >
            {pending ? (
                <ArrowPathIcon className='animate-spin' width={20} />
            ) : (
                <PlusCircleIcon width={20} />
            )}
            Criar Questão
        </button>
    );
};

export default Button;