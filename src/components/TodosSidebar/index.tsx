import React from 'react';
import { Button } from '../Button';
import { AddTodoForm } from '../AddTodoForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/enum';
import { useAuth } from '../../hooks/auth/useAuth';
import { logoutUser } from '../../firebase/auth/authService';
import { customToast } from '../../lib/utils';

export const TodosSidebar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const handleLogout = async () => {
        const result = await logoutUser();
        if (!result.success) {
            customToast({
                message: 'An unexpected error occurred. Please try again.',
                type: 'error',
            });
        }
    };
    return (
        <div className="bg-[#fefdf8] border-l border-b-borderColor flex flex-col justify-between px-5 py-5">
            <AddTodoForm />
            <div className="space-y-2">
                {user ? (
                    <React.Fragment>
                        <Button
                            buttonType="Primary"
                            data-testid="login-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
