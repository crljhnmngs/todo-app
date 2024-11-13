import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast, ToastOptions, Bounce } from 'react-toastify';
import { CustomToastProps } from '../types';

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

export const customToast = ({
    message,
    type = 'info',
    options,
}: CustomToastProps) => {
    const defaultOptions: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        transition: Bounce,
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const showToast = () => {
        if (type === 'success') {
            toast.success(message, mergedOptions);
        } else if (type === 'error') {
            toast.error(message, mergedOptions);
        } else if (type === 'info') {
            toast.info(message, mergedOptions);
        } else if (type === 'warning') {
            toast.warning(message, mergedOptions);
        }
    };
    return showToast();
};
