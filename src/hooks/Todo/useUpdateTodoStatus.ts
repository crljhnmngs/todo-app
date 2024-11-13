import { updateTodoStatus } from '../../firebase/todo/todoService';
import { UseTodosHookProps } from '../../types';
import { customToast } from '../../lib/utils';

export const useUpdateTodoStatus = ({
    userId,
    setLoading,
}: UseTodosHookProps) => {
    const handleUpdateTodoStatus = async (todoId: string, status: boolean) => {
        setLoading(true);
        try {
            const response = await updateTodoStatus({
                userId,
                todoId,
                updates: {
                    isCompleted: status,
                },
            });
            if (!response.success) {
                customToast({ message: response.message, type: 'error' });
            }
        } catch (err) {
            customToast({
                message: 'An error occurred while updating the todo',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdateTodoStatus };
};
