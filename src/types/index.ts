import { ToastOptions } from 'react-toastify';

export type ButtonProps = {
    buttonType: 'Primary' | 'Secondary' | 'Danger';
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
    [key: string]: any;
};

export type InputProps = {
    name: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: boolean;
    className?: string;
    [key: string]: any;
};

export type Todo = {
    id: string;
    isCompleted: boolean;
    task: string;
};

export type UserTodos = {
    [id: string]: Todo;
};

export type UseUserTodosResponse = {
    userTodos: Todo[];
    loading: boolean;
};

export type CallbackResponse = {
    success: boolean;
    data: any;
    message?: string;
};

export type UseTodosHookProps = {
    userId: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AddTodo = {
    userId: string;
    todo: string;
};

type TodoStatusUpdate = {
    isCompleted: boolean;
};

export type UpdateTodo = {
    userId: string;
    todoId: string;
    updates: TodoStatusUpdate;
};
export type DeleteTodo = {
    userId: string;
    todoId: string;
};

export type CustomToastProps = {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    options?: ToastOptions;
};

export type TodosListProps = {
    userTodos: Todo[];
};

export type AddTodoResponse = {
    success: boolean;
    message: string;
};

export type TodosHeaderProps = {
    totalTodosCount: number;
    totalCompletedTodosCount: number;
};
