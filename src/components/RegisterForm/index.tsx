import React from 'react';

export const RegisterForm = () => {
    return (
        <form className="h-9/10 w-[37rem] bg-white rounded-lg">
            <div className="w-full flex flex-col justify-center items-center pt-8 gap-1">
                <span className="font-semibold text-3xl">
                    Registration Form
                </span>
                <span className="text-sm text-gray-600">
                    Fill out the form carefully for registration
                </span>
            </div>
            <div>FirstName Lastname</div>
            <div>Gender Age</div>
            <div>Username Email</div>
            <div>Country - State/Province - City</div>
            <div>Password Confirm Password</div>
        </form>
    );
};
