import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '.';

describe('NotFound Component', () => {
    it('should render the NotFound page with the correct text', () => {
        render(<NotFound />);

        const oopsMessage = screen.getByText(/oops! page not found/i);
        expect(oopsMessage).toBeInTheDocument();

        const firstNumber = screen.queryAllByText('4')[0];
        expect(firstNumber).toBeInTheDocument();

        const secondNumber = screen.queryAllByText('0')[0];
        expect(secondNumber).toBeInTheDocument();

        const thirdNumber = screen.queryAllByText('4')[1];
        expect(thirdNumber).toBeInTheDocument();

        const notFoundMessage = screen.getByText(
            /we are sorry, but the page you requested was not found/i
        );
        expect(notFoundMessage).toBeInTheDocument();
    });
});
