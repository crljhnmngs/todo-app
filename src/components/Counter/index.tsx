import React from 'react';

export const Counter = () => {
    return (
        <div className="flex gap-1">
            <span className="font-semibold">0</span>
            <span>/</span>
            <span>3</span>
            <span className="pl-2">todos completed</span>
        </div>
    );
};
