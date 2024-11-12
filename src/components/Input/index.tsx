import React from 'react';
import { InputProps } from '../../types';
import { cn } from '../../lib/utils';

export const Input = ({
    name,
    type,
    value,
    onChange,
    placeholder,
    error,
    className,
    ...props
}: InputProps) => {
    return (
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                `h-12 w-full text-sm border ${error ? 'border-red-500' : 'border-borderColor'} rounded-md mx-0 my-2 px-4 py-0`,
                className
            )}
            {...props}
        />
    );
};
