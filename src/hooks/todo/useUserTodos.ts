import { useState, useEffect } from 'react';
import { onUserTodosUpdate } from '../../firebase/todo/todoService';
import { UseUserTodosResponse, UserTodos, Todo } from '../../types';
import { customToast } from '../../lib/utils';
import { getLocalTodos } from '../../localStorage/todo/todoService';

const useUserTodos = (userId: string): UseUserTodosResponse => {
    const [userTodos, setUserTodos] = useState<UserTodos[]>([]);
    const [localTodos, setLocalTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    let extractedData: Todo[];

    useEffect(() => {
        const handleStorageChange = () => {
            if (!userId) {
                setLocalTodos(getLocalTodos());
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [userId]);

    useEffect(() => {
        setLoading(true);
        try {
            if (userId) {
                const unsubscribe = onUserTodosUpdate(userId, (response) => {
                    if (response.success) {
                        setUserTodos(response.data);
                    } else {
                        customToast({
                            message:
                                response.message ||
                                'An error occurred while getting todo(s)',
                            type: 'error',
                        });
                    }
                });
                return () => unsubscribe();
            } else {
                setLocalTodos(getLocalTodos());
            }
        } catch (err) {
            customToast({
                message: 'An error occurred while getting todo(s)',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [userId, setLoading]);

    if (userId) {
        try {
            extractedData = userTodos.flatMap((obj: UserTodos) =>
                Object.entries(obj).map(
                    ([id, { isCompleted, task }]: [string, Todo]) => ({
                        id,
                        isCompleted,
                        task,
                    })
                )
            );
        } catch (err) {
            extractedData = [];
            customToast({
                message: 'An error occurred while getting todo(s)',
                type: 'error',
            });
        }
    } else {
        extractedData = localTodos;
    }
    return { userTodos: extractedData, loading };
};

export default useUserTodos;
