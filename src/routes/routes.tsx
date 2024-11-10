import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Todo } from '../pages/Todo';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ROUTES } from '../lib/enum';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: ROUTES.TODO,
        element: <Todo />,
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
    },
    {
        path: ROUTES.REGISTER,
        element: <Register />,
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
    },
]);
