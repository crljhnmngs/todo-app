import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';
import '@testing-library/jest-dom';

describe('Button Component', () => {
    const mockOnClick = jest.fn();

    const renderButton = (props = {}) => {
        return render(
            <Button buttonType="Primary" onClick={mockOnClick} {...props}>
                Test Button
            </Button>
        );
    };

    afterEach(() => {
        mockOnClick.mockClear();
    });

    it('should render the button with default props', () => {
        renderButton();
        const button = screen.getByRole('button', { name: /test button/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(
            'h-12 w-full border-none rounded-md bg-btnPrimary text-white text-base cursor-pointer flex justify-center items-center hover:bg-btnHover'
        );
    });

    it('should trigger onClick when clicked', () => {
        renderButton();
        const button = screen.getByRole('button', { name: /test button/i });
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should apply "Secondary" button type class correctly', () => {
        renderButton({ buttonType: 'Secondary' });
        const button = screen.getByRole('button', { name: /test button/i });
        expect(button).toHaveClass('text-sm opacity-85');
    });

    it('should apply "Danger" button type class correctly', () => {
        renderButton({ buttonType: 'Danger' });
        const button = screen.getByRole('button', { name: /test button/i });
        expect(button).toHaveClass('bg-red-800 hover:bg-red-900');
    });

    it('should apply custom className correctly', () => {
        renderButton({ className: 'custom-class' });
        const button = screen.getByRole('button', { name: /test button/i });
        expect(button).toHaveClass('custom-class');
    });
});
