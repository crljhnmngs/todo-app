import { MAX_LOCAL_TODOS, TODOS_KEY } from '../../lib/const';
import { Todo } from '../../types';

export const getLocalTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
};

export const saveTodos = (todos: Todo[]): void => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    window.dispatchEvent(new Event('storage'));
};

export const addLocalTodo = (task: string): void => {
    const todos = getLocalTodos();
    if (todos.length === MAX_LOCAL_TODOS) {
        throw new Error(
            'Please sign in to add more todos. Maximum limit reached.'
        );
    }
    const newTodo: Todo = {
        id: Date.now().toString(),
        isCompleted: false,
        task: task,
    };
    saveTodos([...todos, newTodo]);
};

export const updateLocalTodo = (id: string, isCompleted: boolean): void => {
    const todos = getLocalTodos();
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted } : todo
    );
    saveTodos(updatedTodos);
};

export const deleteLocalTodo = (id: string): void => {
    const todos = getLocalTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(filteredTodos);
};
