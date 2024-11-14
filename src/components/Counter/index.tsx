import React from 'react';
import { TodosHeaderProps } from '../../types';

export const Counter = ({
    totalTodosCount,
    totalCompletedTodosCount,
}: TodosHeaderProps) => {
    return (
        <div className="flex gap-1">
            <span className="font-semibold">{totalCompletedTodosCount}</span>
            <span>/</span>
            <span>{totalTodosCount}</span>
            <span className="pl-2">todos completed</span>
        </div>
    );
};
