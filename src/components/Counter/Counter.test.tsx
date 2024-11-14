import React from 'react';
import { render, screen } from '@testing-library/react';
import { Counter } from '.';
import '@testing-library/jest-dom';

describe('Counter Component', () => {
    it('should render the correct count of completed and total todos', () => {
        render(<Counter totalTodosCount={10} totalCompletedTodosCount={5} />);

        expect(screen.getAllByText('5')[0]).toBeInTheDocument();
        expect(screen.getByText('/')).toBeInTheDocument();
        expect(screen.getAllByText('10')[0]).toBeInTheDocument();
        expect(screen.getByText('todos completed')).toBeInTheDocument();
    });

    it('should display zero when there are no todos', () => {
        render(<Counter totalTodosCount={0} totalCompletedTodosCount={0} />);

        expect(screen.getAllByText('0')[0]).toBeInTheDocument();
        expect(screen.getByText('/')).toBeInTheDocument();
        expect(screen.getAllByText('0')[1]).toBeInTheDocument();
        expect(screen.getByText('todos completed')).toBeInTheDocument();
    });

    it('should render correctly when all todos are completed', () => {
        render(<Counter totalTodosCount={5} totalCompletedTodosCount={5} />);

        expect(screen.getAllByText('5')[0]).toBeInTheDocument();
        expect(screen.getByText('/')).toBeInTheDocument();
        expect(screen.getAllByText('5')[1]).toBeInTheDocument();
        expect(screen.getByText('todos completed')).toBeInTheDocument();
    });
});
