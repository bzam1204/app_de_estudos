import React from 'react';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <section className='flex flex-col w-screen h-full p-4 grow '>
            {children}
        </section>
    );
};

export default Layout;