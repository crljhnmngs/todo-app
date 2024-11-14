import React from 'react';
import { Button } from '../Button';
import { AddTodoForm } from '../AddTodoForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/enum';

export const TodosSidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#fefdf8] border-l border-b-borderColor flex flex-col justify-between px-5 py-5">
            <AddTodoForm />
            <div className="space-y-2">
                <Button
                    buttonType="Primary"
                    data-testid="login-button"
                    onClick={() => navigate(ROUTES.LOGIN)}
                >
                    Login
                </Button>
                <Button
                    buttonType="Primary"
                    data-testid="register-button"
                    onClick={() => navigate(ROUTES.REGISTER)}
                >
                    Register
                </Button>
            </div>
        </div>
    );
};
