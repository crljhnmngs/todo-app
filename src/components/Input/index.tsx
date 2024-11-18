import React, { useState } from 'react';
import { InputProps } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

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
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="flex flex-col w-full">
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
            <div className="relative">
                <input
                    type={
                        type === 'password'
                            ? !passwordVisible
                                ? 'password'
                                : 'text'
                            : type
                    }
                    id={name}
                    placeholder={placeholder}
                    className={cn(
                        `h-12 w-full text-sm border ${error ? 'border-red-500 focus:outline-none' : 'border-borderColor'} rounded-md mx-0 my-2 px-4 py-0 mt-1`,
                        className
                    )}
                    {...register(name, rules)}
                    {...props}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? (
                            <FaEyeSlash className="text-[22px]" />
                        ) : (
                            <FaEye className="text-xl" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
