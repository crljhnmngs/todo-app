import React from 'react';
import { CommonHeader } from '../../components/Header/CommonHeader';
import { LoginForm } from '../../components/LoginForm';

export const Login = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <CommonHeader />
            <section className="flex-1 bg-primaryBG flex justify-center items-center">
                <LoginForm />
            </section>
        </div>
    );
};
