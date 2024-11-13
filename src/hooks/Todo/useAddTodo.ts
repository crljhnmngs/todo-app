import { useState } from 'react';
import { addTodo } from '../../firebase/todo/todoService';
import { customToast } from '../../lib/utils';

interface AddTodoResponse {
    success: boolean;
    message: string;
}

const useAddTodo = (userId: string) => {
    const [todoContent, setTodoContent] = useState<string>('');
    const handleAddTodo = async () => {
        try {
            if (todoContent.trim()) {
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
        }
    };

    return {
        todoContent,
        setTodoContent,
        handleAddTodo,
    };
};

export default useAddTodo;
