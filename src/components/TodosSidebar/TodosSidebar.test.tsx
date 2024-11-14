import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodosSidebar } from '.';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/enum';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('TodosSidebar Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it('should render AddTodoForm', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <TodosSidebar />
            </MemoryRouter>
        );
        const addTodoForm = screen.getByTestId('addTodoForm');
        expect(addTodoForm).toBeInTheDocument();

        const addButton = screen.getByRole('button', { name: /Add to list/i });
        expect(addButton).toBeInTheDocument();
    });

    it('should navigate to LOGIN route when Login button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <TodosSidebar />
            </MemoryRouter>
        );

        const loginButton = screen.getByTestId('login-button');
        fireEvent.click(loginButton);

        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
    });

    it('should navigate to REGISTER route when Register button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <TodosSidebar />
            </MemoryRouter>
        );

        const registerButton = screen.getByTestId('register-button');
        fireEvent.click(registerButton);

        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.REGISTER);
    });
});
