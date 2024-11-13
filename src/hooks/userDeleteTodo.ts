import { toast, Bounce } from 'react-toastify';
import { deleteTodo } from '../firebase/todo/todoService';

const useDeleteTodo = (
    userId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const handleDeleteTodo = async (todoId: string): Promise<void> => {
        setLoading(true);
        try {
            const response = await deleteTodo(userId, todoId);
            if (response.success) {
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    transition: Bounce,
                });
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
        } catch (err) {
            toast.error('An error occurred while deleting the todo', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteTodo };
};

export default useDeleteTodo;
