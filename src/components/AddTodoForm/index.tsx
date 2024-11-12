import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';

export const AddTodoForm = () => {
    const [todoContent, setTodoContent] = useState<string>('');
    return (
        <form>
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
