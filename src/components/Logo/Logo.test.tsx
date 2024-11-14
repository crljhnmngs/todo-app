import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from '.';

describe('Logo Component', () => {
    it('should render three circular divs with correct classes', () => {
        render(<Logo />);

        const divs = screen.getAllByTestId(/circle-/);

        expect(divs.length).toBe(3);

        divs.forEach((div: HTMLElement) => {
            expect(div).toHaveClass('rounded-full');
            expect(div).toHaveClass('h-5');
            expect(div).toHaveClass('w-5');
            expect(div).toHaveClass('bg-[#ada69e]');
        });
    });
});
