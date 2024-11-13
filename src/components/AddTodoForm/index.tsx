import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import useAddTodo from '../../hooks/todo/useAddTodo';

export const AddTodoForm = () => {
    //TODO: Use redux to store and get this user data
    const userId = 'user1';
    const { todoContent, setTodoContent, handleAddTodo } = useAddTodo(userId);

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
