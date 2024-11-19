import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Todo } from '../pages/Todo';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ROUTES } from '../lib/enum';
import { NotFound } from '../pages/NotFound';
import { useAuth } from '../hooks/auth/useAuth';

const AuthRedirect = ({
    element,
    redirectTo,
}: {
    element: JSX.Element;
    redirectTo: string;
}) => {
    const { user } = useAuth();
    return user ? <Navigate to={redirectTo} /> : element;
};

export const router = createBrowserRouter([
    {
        path: ROUTES.TODO,
        element: <Todo />,
    },
    {
        path: ROUTES.LOGIN,
        element: <AuthRedirect element={<Login />} redirectTo={ROUTES.TODO} />,
    },
    {
        path: ROUTES.REGISTER,
        element: (
            <AuthRedirect element={<Register />} redirectTo={ROUTES.TODO} />
        ),
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
    },
]);
