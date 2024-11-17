import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast, ToastOptions, Bounce } from 'react-toastify';
import { CustomToastProps } from '../types';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const handleError = (error: any, actionDescription: string) => {
    let message = '';

    switch (error) {
        case 'auth/invalid-email':
            message = 'The email address is badly formatted.';
            break;
        case 'auth/email-already-in-use':
            message = 'The email address is already in use by another account.';
            break;
        case 'auth/weak-password':
            message = 'The password must be 6 characters long or more.';
            break;
        default:
            message = `Failed to complete ${actionDescription}. Please try again later.`;
            break;
    }
    return {
        success: false,
        message: message,
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

export const emailValidationRule = {
    required: 'required',
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format',
    },
};

export const passwordMatchRule = (password: string) => ({
    required: 'required',
    validate: (value: string) => value === password || 'not match',
});
