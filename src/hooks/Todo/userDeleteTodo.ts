import { deleteTodo } from '../../firebase/todo/todoService';
import { UseTodosHookProps } from '../../types';
import { customToast } from '../../lib/utils';
import { deleteLocalTodo } from '../../localStorage/todo/todoService';

const useDeleteTodo = ({ userId, setLoading }: UseTodosHookProps) => {
    const handleDeleteTodo = async (todoId: string): Promise<void> => {
        setLoading(true);
        try {
            if (userId) {
                const response = await deleteTodo({ userId, todoId });
                if (!response.success) {
                    customToast({ message: response.message, type: 'error' });
                }
            } else {
                deleteLocalTodo(todoId);
            }
        } catch (err) {
            customToast({
                message: 'An error occurred while deleting the todo',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteTodo };
};

export default useDeleteTodo;
