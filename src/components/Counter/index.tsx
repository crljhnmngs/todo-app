import React from 'react';
import { TodosHeaderProps } from '../../types';

export const Counter = ({
    totalTodosCount,
    totalCompletedTodosCount,
}: TodosHeaderProps) => {
    return (
        <div className="flex xs:gap-1">
            <span className="font-semibold text-sm xs:text-base">
                {totalCompletedTodosCount}
            </span>
            <span className="text-sm xs:text-base">/</span>
            <span className="text-sm xs:text-base">{totalTodosCount}</span>
            <span className="pl-2 text-sm xs:text-base">todos completed</span>
        </div>
    );
};
