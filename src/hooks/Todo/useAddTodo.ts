import { useState } from 'react';
import { addTodo } from '../../firebase/todo/todoService';
import { customToast } from '../../lib/utils';
import { AddTodoResponse } from '../../types';

const useAddTodo = (userId: string) => {
    const [todoContent, setTodoContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const handleAddTodo = async () => {
        try {
            if (todoContent.trim()) {
                setLoading(true);
                const response: AddTodoResponse = await addTodo({
                    userId,
                    todo: todoContent.trim(),
                });

                if (response.success) {
                    setTodoContent('');
                } else {
                    customToast({ message: response.message, type: 'error' });
                }
            }
        } catch (error) {
            customToast({
                message: 'An error occurred while adding the todo',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        todoContent,
        setTodoContent,
        handleAddTodo,
        loading,
    };
};

export default useAddTodo;
