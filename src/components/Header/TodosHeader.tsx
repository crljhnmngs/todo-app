import React from 'react';
import { Counter } from '../Counter';
import { Logo } from '../Logo';
import { TodosHeaderProps } from '../../types';

export const TodosHeader = ({
    totalTodosCount,
    totalCompletedTodosCount,
}: TodosHeaderProps) => {
    return (
        <div className="h-16 col-span-2 bg-[#fcf5ed] flex items-center justify-between px-9">
            <Logo />
            <Counter
                totalTodosCount={totalTodosCount}
                totalCompletedTodosCount={totalCompletedTodosCount}
            />
        </div>
    );
};
