import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTodoForm } from '.';
import useAddTodo from '../../hooks/todo/useAddTodo';

jest.mock('../Input', () => ({
    Input: jest.fn(({ error, register, ...props }) => (
        <div>
            <input
                data-testid="mock-input"
                {...register('inputTodo')}
                {...props}
            />
            {error && <span>{error}</span>}
        </div>
    )),
}));

jest.mock('../Button', () => ({
    Button: jest.fn(({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    )),
}));

jest.mock('../../hooks/todo/useAddTodo');
jest.mock('../../firebase/todo/todoService');

const mockedUseAddTodo = useAddTodo as jest.MockedFunction<typeof useAddTodo>;

describe('AddTodoForm', () => {
    const handleAddTodoMock = jest.fn();

    beforeEach(() => {
        mockedUseAddTodo.mockReturnValue({
            handleAddTodo: handleAddTodoMock,
            loading: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render input and button', async () => {
        render(<AddTodoForm />);

        const input = screen.getByTestId('mock-input');
        const button = screen.getByRole('button', { name: /Add to list/i });

        await waitFor(() => {
            expect(input).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(button).toBeInTheDocument();
        });
    });

    it('should display loading indicator when loading is true', async () => {
        mockedUseAddTodo.mockReturnValue({
            handleAddTodo: handleAddTodoMock,
            loading: true,
        });

        render(<AddTodoForm />);

        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });
    });

    it('should call handleAddTodo with input value when form is submitted', async () => {
        render(<AddTodoForm />);

        const form = screen.getByTestId('addTodoForm');
        const input = screen.getByTestId('mock-input');

        fireEvent.change(input, { target: { value: 'New todo' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(handleAddTodoMock).toHaveBeenCalledWith('New todo');
        });
    });

    it('should reset input after successful form submission', async () => {
        render(<AddTodoForm />);

        const form = screen.getByTestId('addTodoForm');
        const input = screen.getByTestId('mock-input');

        fireEvent.change(input, { target: { value: 'New todo' } });

        fireEvent.submit(form);

        await waitFor(() => {
            expect(handleAddTodoMock).toHaveBeenCalledWith('New todo');
        });

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });

    it('should not call handleAddTodo with empty input value', async () => {
        render(<AddTodoForm />);

        const form = screen.getByTestId('addTodoForm');

        fireEvent.submit(form);

        await waitFor(() => {
            expect(handleAddTodoMock).not.toHaveBeenCalled();
        });
    });
});
