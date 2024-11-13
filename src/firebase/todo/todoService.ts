import { db } from '../firebaseConfig';
import {
    ref,
    set,
    push,
    update,
    remove,
    onValue,
    off,
    DataSnapshot,
} from 'firebase/database';
import { handleError } from '../../lib/utils';
import {
    CallbackResponse,
    DeleteTodo,
    UserTodos,
    AddTodo,
    UpdateTodo,
} from '../../types';

export const onUserTodosUpdate = (
    userId: string,
    callback: (response: CallbackResponse) => void
): (() => void) => {
    const todosRef = ref(db, `userTodos/${userId}`);
    try {
        const unsubscribe = onValue(
            todosRef,
            (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const todosData = snapshot.val();
                    const todosArray: any = Object.entries(todosData).map(
                        ([id, data]) => ({
                            ...(data as UserTodos),
                        })
                    );
                    callback({ success: true, data: todosArray });
                } else {
                    callback({ success: true, data: [] });
                }
            },
            (error) => {
                callback({
                    success: false,
                    data: [],
                    message: 'Error when getting users todo',
                });
            }
        );
    } catch (err) {
        callback({
            success: false,
            data: [],
            message: 'Error when getting users todo',
        });
    }
    return () => off(todosRef);
};

export const addTodo = async ({ userId, todo }: AddTodo) => {
    try {
        const todosRef = ref(db, `userTodos/${userId}/todos`);
        const newTodoRef = push(todosRef);
        const newTodo = {
            task: todo,
            isCompleted: false,
            createdAt: new Date().toISOString(),
        };
        await set(newTodoRef, newTodo);
        return { success: true, message: 'Todo added successfully' };
    } catch (error) {
        return handleError(error, 'adding a todo');
    }
};

export const updateTodoStatus = async ({
    userId,
    todoId,
    updates,
}: UpdateTodo) => {
    try {
        const todoRef = ref(db, `userTodos/${userId}/todos/${todoId}`);
        await update(todoRef, updates);
        return { success: true, message: 'Todo updated successfully' };
    } catch (error) {
        return handleError(error, 'updating the todo');
    }
};

export const deleteTodo = async ({ userId, todoId }: DeleteTodo) => {
    try {
        const todoRef = ref(db, `userTodos/${userId}/todos/${todoId}`);
        await remove(todoRef);
        return { success: true, message: 'Todo deleted successfully' };
    } catch (error) {
        return handleError(error, 'deleting the todo');
    }
};
