import React from 'react';
import { MdError } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { capitalizeFirstLetter, cn } from '../../lib/utils';
import { SelectProps } from '../../types';

export const Select = ({
    name,
    label,
    error,
    options,
    className,
    register,
    rules,
    placeholder,
    loading,
    ...props
}: SelectProps) => {
    const renderOptions = () => {
        if (Array.isArray(options)) {
            return options.map((option, id) => (
                <option key={id} value={option.label}>
                    {option.label}
                </option>
            ));
        }

        if (typeof options === 'object' && options !== null) {
            return Object.entries(options).map(([key, value]) => (
                <option key={value} value={value}>
                    {capitalizeFirstLetter(key)}
                </option>
            ));
        }
        return null;
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
            <select
                id={name}
                className={cn(
                    `h-12 w-full text-sm border ${error ? 'border-red-500 focus:outline-none' : 'border-borderColor'} rounded-md mx-0 my-2 px-3 py-0 mt-1`,
                    className
                )}
                defaultValue=""
                {...register(name, rules)}
                {...props}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {loading ? (
                    <option disabled>Loading...</option>
                ) : (
                    renderOptions()
                )}
            </select>
        </div>
    );
};
