import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '.';
import '@testing-library/jest-dom';

const mockRegister = jest.fn();
//Added mock for onChange to remove warning.
const mockOnChange = jest.fn();

describe('Input Component', () => {
    const renderInput = (props = {}) => {
        return render(
            <Input
                name="username"
                type="text"
                onChange={mockOnChange}
                value=""
                placeholder="Enter username"
                register={mockRegister}
                {...props}
            />
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the input with default props', () => {
        renderInput();
        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    it('should apply error styles when error prop is true', () => {
        renderInput({ error: true });
        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toHaveClass('border-red-500');
    });

    it('should apply default styles when error prop is false', () => {
        renderInput({ error: false });
        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toHaveClass('border-borderColor');
    });

    it('should apply custom className correctly', () => {
        renderInput({ className: 'custom-class' });
        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toHaveClass('custom-class');
    });

    it('should call register function with correct arguments', () => {
        renderInput();
        expect(mockRegister).toHaveBeenCalledWith('username', undefined);
    });
});
