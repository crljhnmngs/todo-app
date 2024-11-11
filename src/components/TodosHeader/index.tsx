import React from 'react';
import { Counter } from '../Counter';
import { Logo } from '../Logo';

export const TodosHeader = () => {
    return (
        <div className="h-16 col-span-2 bg-[#fcf5ed] flex items-center justify-between px-9">
            <Logo />
            <Counter />
        </div>
    );
};
