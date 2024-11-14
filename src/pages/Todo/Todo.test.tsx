import React from 'react';
import { render, screen } from '@testing-library/react';
import { Todo } from '.';
import { TodosHeader } from '../../components/TodosHeader';
import { TodosList } from '../../components/TodosList';
import useUserTodos from '../../hooks/todo/useUserTodos';

jest.mock('../../hooks/todo/useUserTodos');
jest.mock('../../components/TodosHeader', () => ({
    TodosHeader: jest.fn(() => <div data-testid="todos-header" />),
}));
jest.mock('../../components/TodosList', () => ({
    TodosList: jest.fn(() => <div data-testid="todos-list" />),
}));
jest.mock('../../components/TodosSidebar', () => ({
    TodosSidebar: jest.fn(() => <div data-testid="todos-sidebar" />),
}));
jest.mock('../../components/Loading', () => ({
    Loading: jest.fn(() => <div data-testid="loading" />),
}));

describe('Todo Component', () => {
    const mockUseUserTodos = useUserTodos as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading component when loading is true', () => {
        mockUseUserTodos.mockReturnValue({
            userTodos: [],
            loading: true,
        });

        render(<Todo />);

        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('does not render loading component when loading is false', () => {
        mockUseUserTodos.mockReturnValue({
            userTodos: [],
            loading: false,
        });

        render(<Todo />);

        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('renders TodosHeader with correct props', () => {
        const todos = [
            { id: '1', task: 'Test Todo 1', isCompleted: false },
            { id: '2', task: 'Test Todo 2', isCompleted: true },
        ];

        mockUseUserTodos.mockReturnValue({
            userTodos: todos,
            loading: false,
        });

        render(<Todo />);

        expect(TodosHeader).toHaveBeenCalledWith(
            {
                totalTodosCount: 2,
                totalCompletedTodosCount: 1,
            },
            {}
        );
    });

    it('renders TodosList with userTodos', () => {
        const todos = [{ id: '1', task: 'Test Todo', isCompleted: false }];

        mockUseUserTodos.mockReturnValue({
            userTodos: todos,
            loading: false,
        });

        render(<Todo />);

        expect(TodosList).toHaveBeenCalledWith({ userTodos: todos }, {});
    });

    it('renders TodosSidebar component', () => {
        mockUseUserTodos.mockReturnValue({
            userTodos: [],
            loading: false,
        });

        render(<Todo />);

        expect(screen.getByTestId('todos-sidebar')).toBeInTheDocument();
    });
});
