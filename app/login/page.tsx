
import React from 'react';
import LoginForm from '../ui/login-form';

interface Props {
    // Define the props for your component here
}

const LoginPage: React.FC<Props> = (props) => {
    // Add your component logic here

    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;