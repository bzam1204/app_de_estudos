import React from 'react';
import Header from '../ui/header';

const MyComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <Header/>
            {children}
        </div>
    );
};

export default MyComponent;