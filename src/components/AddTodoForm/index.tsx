import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { addTodo } from '../../firebase/todo/todoService';
import { toast, Bounce } from 'react-toastify';

export const AddTodoForm = () => {
    const [todoContent, setTodoContent] = useState<string>('');
    //TODO: Use redux to store and get this user data
    const userId = 'user1';
    const handleAddTodo = async () => {
        if (todoContent.trim()) {
            const response = await addTodo(userId, todoContent.trim());
            if (response.success) {
                setTodoContent('');
                //TODO: Create a custom component for toast
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    transition: Bounce,
                });
            } else {
                //TODO: Create a custom component for toast
                toast.error(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    transition: Bounce,
                });
            }
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleAddTodo();
            }}
        >
            <h2 className="text-[#231D15] text-base font-medium">Add a todo</h2>
            <Input
                name="InputTodo"
                type="text"
                value={todoContent}
                onChange={(e) => setTodoContent(e.target.value)}
                autoFocus
            />
            <Button buttonType="Primary" onClick={() => {}}>
                Add to list
            </Button>
        </form>
    );
};
