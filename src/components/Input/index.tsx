import React from 'react';
import { InputErrorProps, InputProps } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';

export const Input = ({
    name,
    type,
    placeholder,
    label,
    error,
    className,
    register,
    rules,
    ...props
}: InputProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <label
                    className="text-[#231D15] text-base font-medium"
                    htmlFor={name}
                >
                    {label}
                </label>
                <AnimatePresence mode="wait" initial={false}>
                    {error && (
                        <motion.p
                            className="flex items-center gap-1 px-2 text-sm font-medium text-red-500 bg-red-100 rounded-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MdError />
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                className={cn(
                    `h-12 w-full text-sm border ${error ? 'border-red-500 focus:outline-none' : 'border-borderColor'} rounded-md mx-0 my-2 px-4 py-0 mt-1`,
                    className
                )}
                {...register(name, rules)}
                {...props}
            />
        </div>
    );
};
