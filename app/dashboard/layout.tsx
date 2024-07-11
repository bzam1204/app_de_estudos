import React from 'react';
import Header from '../ui/header';

interface Props {
    name: string;
}

const MyComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
};

export default MyComponent;