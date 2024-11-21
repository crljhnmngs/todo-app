import { useState } from 'react';
import { addTodo } from '../../firebase/todo/todoService';
import { customToast } from '../../lib/utils';
import { AddTodoResponse } from '../../types';
import { addLocalTodo } from '../../localStorage/todo/todoService';

const useAddTodo = (userId: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleAddTodo = async (todoContent: string) => {
        try {
            if (userId) {
                if (todoContent.trim()) {
                    setLoading(true);
                    const response: AddTodoResponse = await addTodo({
                        userId,
                        todo: todoContent.trim(),
                    });

                    if (response.success) {
                    } else {
                        customToast({
                            message: response.message,
                            type: 'error',
                        });
                    }
                }
            } else {
                addLocalTodo(todoContent.trim());
            }
        } catch (error) {
            customToast({
                message:
                    error instanceof Error
                        ? error.message
                        : 'An error occurred while adding the todo',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        handleAddTodo,
        loading,
    };
};

export default useAddTodo;
