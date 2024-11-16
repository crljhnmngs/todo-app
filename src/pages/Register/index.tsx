import React from 'react';
import { RegisterForm } from '../../components/RegisterForm';
import { CommonHeader } from '../../components/Header/CommonHeader';

export const Register = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <CommonHeader />
            <section className="flex-1 bg-primaryBG flex justify-center items-center">
                <RegisterForm />
            </section>
        </div>
    );
};
