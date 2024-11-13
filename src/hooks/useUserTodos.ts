import { useState, useEffect } from 'react';
import { onUserTodosUpdate } from '../firebase/todo/todoService';
import { UseUserTodosResponse, UserTodos, Todo } from '../types';
import { toast, Bounce } from 'react-toastify';

const useUserTodos = (
    userId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): UseUserTodosResponse => {
    const [userTodos, setUserTodos] = useState<UserTodos[]>([]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onUserTodosUpdate(userId, (response) => {
            if (response.success) {
                setUserTodos(response.data);
            } else {
                toast.error(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    transition: Bounce,
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId, setLoading]);

    const extractedData = userTodos.flatMap((obj: UserTodos) =>
        Object.entries(obj).map(
            ([id, { isCompleted, task }]: [string, Todo]) => ({
                id,
                isCompleted,
                task,
            })
        )
    );

    return { userTodos: extractedData };
};

export default useUserTodos;
