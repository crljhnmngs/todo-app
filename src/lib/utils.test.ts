import { cn, handleError, capitalizeFirstLetter, customToast } from './utils';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        warning: jest.fn(),
    },
}));

describe('cn utility', () => {
    it('should merge and deduplicate class names', () => {
        const result = cn('bg-red-500', 'text-white', 'bg-red-500');
        expect(result).toBe('text-white bg-red-500');
    });

    it('should handle empty inputs', () => {
        const result = cn();
        expect(result).toBe('');
    });
});

describe('handleError utility', () => {
    it('should return an error object with success as false and a message', () => {
        const error = new Error('Test error');
        const result = handleError(error, 'loading data');

        expect(result.success).toBe(false);
        expect(result.message).toBe(
            'Failed to complete loading data. Please try again later.'
        );
    });
});

describe('capitalizeFirstLetter utility', () => {
    it('should capitalize the first letter of a lowercase word', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    it('should return an empty string if input is empty', () => {
        expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should not change an already capitalized word', () => {
        expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });
});

describe('customToast utility', () => {
    const defaultOptions = {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    };

    it('should call toast.info for default type', () => {
        customToast({ message: 'Default message' });
        expect(toast.info).toHaveBeenCalledWith(
            'Default message',
            expect.objectContaining(defaultOptions)
        );
    });

    it('should call toast.success for success type', () => {
        customToast({ message: 'Success message', type: 'success' });
        expect(toast.success).toHaveBeenCalledWith(
            'Success message',
            expect.objectContaining(defaultOptions)
        );
    });

    it('should call toast.error for error type', () => {
        customToast({ message: 'Error message', type: 'error' });
        expect(toast.error).toHaveBeenCalledWith(
            'Error message',
            expect.objectContaining(defaultOptions)
        );
    });

    it('should call toast.info for info type', () => {
        customToast({ message: 'Info message', type: 'info' });
        expect(toast.info).toHaveBeenCalledWith(
            'Info message',
            expect.objectContaining(defaultOptions)
        );
    });

    it('should call toast.warning for warning type', () => {
        customToast({ message: 'Warning message', type: 'warning' });
        expect(toast.warning).toHaveBeenCalledWith(
            'Warning message',
            expect.objectContaining(defaultOptions)
        );
    });

    it('should merge custom options with default options', () => {
        customToast({
            message: 'Custom message',
            type: 'info',
            options: { autoClose: 3000 },
        });
        expect(toast.info).toHaveBeenCalledWith(
            'Custom message',
            expect.objectContaining({ autoClose: 3000, position: 'top-right' })
        );
    });
});
