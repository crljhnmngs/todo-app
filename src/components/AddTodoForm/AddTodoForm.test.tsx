import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTodoForm } from '.';
import useAddTodo from '../../hooks/todo/useAddTodo';

jest.mock('../Input', () => ({
    Input: jest.fn(({ value, onChange }) => (
        <input data-testid="mock-input" value={value} onChange={onChange} />
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
    const setTodoContentMock = jest.fn();
    const handleAddTodoMock = jest.fn();

    beforeEach(() => {
        mockedUseAddTodo.mockReturnValue({
            todoContent: '',
            setTodoContent: setTodoContentMock,
            handleAddTodo: handleAddTodoMock,
            loading: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should renders input and button', () => {
        render(<AddTodoForm />);

        const input = screen.getByTestId('mock-input');
        const button = screen.getByRole('button', { name: /Add to list/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should displays loading indicator when loading is true', () => {
        mockedUseAddTodo.mockReturnValue({
            todoContent: '',
            setTodoContent: setTodoContentMock,
            handleAddTodo: handleAddTodoMock,
            loading: true,
        });

        render(<AddTodoForm />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should calls setTodoContent on input change', () => {
        render(<AddTodoForm />);

        const input = screen.getByTestId('mock-input');
        fireEvent.change(input, { target: { value: 'New todo' } });

        expect(setTodoContentMock).toHaveBeenCalledWith('New todo');
    });

    it('should calls handleAddTodo on form submit', async () => {
        render(<AddTodoForm />);

        const form = screen.getByTestId('addTodoForm');
        fireEvent.submit(form);

        await waitFor(() => expect(handleAddTodoMock).toHaveBeenCalled());
    });
});
