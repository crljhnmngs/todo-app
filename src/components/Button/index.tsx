import React from 'react';
import { cn } from '../../lib/utils';
import { ButtonProps } from '../../types';

export const Button = ({
    buttonType,
    className,
    onClick,
    children,
    ...props
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                `h-12 w-full border-none rounded-md bg-btnPrimary text-white text-base cursor-pointer flex justify-center items-center hover:bg-btnHover [transition:all
                _0.2s] ${buttonType === 'Secondary' ? 'text-sm opacity-85' : buttonType === 'Danger' ? 'bg-red-800 hover:bg-red-900' : ''}`,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
