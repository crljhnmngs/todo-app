export type ButtonProps = {
    buttonType: 'Primary' | 'Secondary' | 'Danger';
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
};

export type InputProps = {
    name: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
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
    error?: string;
};

export type CallbackResponse = {
    success: boolean;
    data: any;
    message?: string;
};
