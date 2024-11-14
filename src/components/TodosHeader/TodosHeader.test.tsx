import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodosHeader } from '.';
import { Counter } from '../Counter';

jest.mock('../Counter', () => ({
    Counter: jest.fn(() => <div>Mocked Counter</div>),
}));

jest.mock('../Logo', () => ({
    Logo: jest.fn(() => <div>Mocked Logo</div>),
}));

describe('TodosHeader Component', () => {
    it('should render Logo and Counter components', () => {
        render(
            <TodosHeader totalTodosCount={10} totalCompletedTodosCount={5} />
        );
        expect(screen.getByText('Mocked Logo')).toBeInTheDocument();
        expect(screen.getByText('Mocked Counter')).toBeInTheDocument();
    });

    it('should pass correct props to Counter', () => {
        const totalTodosCount = 10;
        const totalCompletedTodosCount = 5;

        render(
            <TodosHeader
                totalTodosCount={totalTodosCount}
                totalCompletedTodosCount={totalCompletedTodosCount}
            />
        );
        expect(Counter).toHaveBeenCalledWith(
            { totalTodosCount, totalCompletedTodosCount },
            expect.anything()
        );
    });
});
