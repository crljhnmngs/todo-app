import { useState, useEffect } from 'react';
import { onUserTodosUpdate } from '../../firebase/todo/todoService';
import { UseUserTodosResponse, UserTodos, Todo } from '../../types';
import { customToast } from '../../lib/utils';

const useUserTodos = (userId: string): UseUserTodosResponse => {
    const [userTodos, setUserTodos] = useState<UserTodos[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    let extractedData: Todo[];

    useEffect(() => {
        try {
            setLoading(true);
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
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            customToast({
                message: 'An error occurred while getting todo(s)',
                type: 'error',
            });
        }
    }, [userId, setLoading]);

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

    return { userTodos: extractedData, loading };
};

export default useUserTodos;
