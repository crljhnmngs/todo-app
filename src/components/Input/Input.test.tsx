import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '.';
import '@testing-library/jest-dom';

describe('Input Component', () => {
    const mockOnChange = jest.fn();

    const renderInput = (props = {}) => {
        return render(
            <Input
                name="username"
                type="text"
                value=""
                onChange={mockOnChange}
                placeholder="Enter username"
                {...props}
            />
        );
    };

    afterEach(() => {
        mockOnChange.mockClear();
    });

    it('should render the input with default props', () => {
        renderInput();
        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('name', 'username');
    });

    it('should trigger onChange when input value changes', () => {
        renderInput();
        const input = screen.getByPlaceholderText('Enter username');
        fireEvent.change(input, { target: { value: 'new username' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
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
});
