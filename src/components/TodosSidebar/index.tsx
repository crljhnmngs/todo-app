import React from 'react';
import { Button } from '../Button';
import { AddTodoForm } from '../AddTodoForm';

export const TodosSidebar = () => {
    return (
        <div className="bg-[#fefdf8] border-l border-b-borderColor flex flex-col justify-between px-5 py-5">
            <AddTodoForm />
            <div className="space-y-2">
                <Button buttonType="Primary" onClick={() => {}}>
                    Login
                </Button>
                <Button buttonType="Primary" onClick={() => {}}>
                    Register
                </Button>
            </div>
        </div>
    );
};
