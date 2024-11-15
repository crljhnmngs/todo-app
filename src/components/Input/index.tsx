import React from 'react';
import { InputProps } from '../../types';
import { cn } from '../../lib/utils';

export const Input = ({
    name,
    type,
    placeholder,
    error,
    className,
    register,
    rules,
    ...props
}: InputProps) => {
    return (
        <input
            type={type}
            id={name}
            placeholder={placeholder}
            className={cn(
                `h-12 w-full text-sm border ${error ? 'border-red-500' : 'border-borderColor'} rounded-md mx-0 my-2 px-4 py-0`,
                className
            )}
            {...register(name, rules)}
            {...props}
        />
    );
};
