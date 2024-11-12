import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const handleError = (error: any, actionDescription: string) => {
    console.error(`Error during ${actionDescription}:`, error);
    return {
        success: false,
        message: `Failed to complete ${actionDescription}. Please try again later.`,
    };
};

export const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};
