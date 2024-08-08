import { ArrowPathIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ButtonProps {
    pending?: boolean;
    label?: string;
    Icon?: React.ComponentType<any>
}

const Button: React.FC<ButtonProps> = ({ pending, label, Icon }) => {
    return (
        <button
            type="submit"
            className="flex w-fit  justify-center items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800  border-2  border-gray-300 hover:border-amber-500 hover:text-white transition-all font-semibold rounded  hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
        >
            {pending ? (
                <ArrowPathIcon className='animate-spin' width={20} />
            ) : (
                Icon && <Icon width={20} />
            )}
            {label}
        </button>
    );
};

export default Button;