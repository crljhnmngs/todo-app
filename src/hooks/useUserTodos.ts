import { useState, useEffect } from 'react';
import { onUserTodosUpdate } from '../firebase/todo/todoService';
import { UseUserTodosResponse, UserTodos, Todo } from '../types';

const useUserTodos = (userId: string): UseUserTodosResponse => {
    const [userTodos, setUserTodos] = useState<UserTodos[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onUserTodosUpdate(userId, (response) => {
            if (response.success) {
                setUserTodos(response.data);
            } else {
                setError(response.message);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const extractedData = userTodos.flatMap((obj: UserTodos) =>
        Object.entries(obj).map(
            ([id, { isCompleted, task }]: [string, Todo]) => ({
                id,
                isCompleted,
                task,
            })
        )
    );

    return { userTodos: extractedData, loading, error };
};

export default useUserTodos;
