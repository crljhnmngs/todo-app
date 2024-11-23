import React from 'react';
import { Button } from '../Button';
import { AddTodoForm } from '../AddTodoForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/enum';
import { useAuth } from '../../hooks/auth/useAuth';
import { logoutUser } from '../../firebase/auth/authService';
import { customToast } from '../../lib/utils';
import { useSelector } from 'react-redux';
import { selectSidebarState } from '../../features/sidebar/sidebarSelector';

export const TodosSidebar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isOpen = useSelector(selectSidebarState);

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
        <div
            className={`bg-[#fefdf8] border-l border-b-borderColor absolute h-[90%] top-16 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300 md:translate-x-0 md:h-full md:static flex flex-col justify-between px-5 py-5`}
        >
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
