// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { TodosList } from '.';
// import useDeleteTodo from '../../hooks/todo/userDeleteTodo';
// import { useUpdateTodoStatus } from '../../hooks/todo/useUpdateTodoStatus';

// jest.mock('../../hooks/todo/userDeleteTodo');
// jest.mock('../../hooks/todo/useUpdateTodoStatus');

// describe('TodosList Component', () => {
//     const mockHandleDeleteTodo = jest.fn();
//     const mockHandleUpdateTodoStatus = jest.fn();

//     const mockUserTodos = [
//         { id: '1', task: 'first todo', isCompleted: false },
//         { id: '2', task: 'second todo', isCompleted: true },
//     ];

//     beforeEach(() => {
//         (useDeleteTodo as jest.Mock).mockReturnValue({
//             handleDeleteTodo: mockHandleDeleteTodo,
//         });
//         (useUpdateTodoStatus as jest.Mock).mockReturnValue({
//             handleUpdateTodoStatus: mockHandleUpdateTodoStatus,
//         });
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should render empty message when no todos are passed', () => {
//         render(<TodosList userTodos={[]} />);

//         const emptyMessage = screen.getByText(/start by adding a todo/i);
//         expect(emptyMessage).toBeInTheDocument();
//     });

//     it('should render todos when userTodos are provided', () => {
//         render(<TodosList userTodos={mockUserTodos} />);

//         const todoItems = screen.getAllByRole('listitem');
//         expect(todoItems).toHaveLength(mockUserTodos.length);
//     });

//     it('should toggle todo status when a todo item is clicked', async () => {
//         render(<TodosList userTodos={mockUserTodos} />);

//         const todoItem = screen.getByText(/first todo/i);
//         fireEvent.click(todoItem);

//         await waitFor(() => {
//             expect(mockHandleUpdateTodoStatus).toHaveBeenCalledWith('1', true);
//         });
//     });

//     it('should call delete handler when the delete button is clicked', async () => {
//         render(<TodosList userTodos={mockUserTodos} />);

//         const deleteButton = screen.getAllByText('❌')[0];
//         fireEvent.click(deleteButton);

//         await waitFor(() => {
//             expect(mockHandleDeleteTodo).toHaveBeenCalledWith('1');
//         });
//     });

//     it('should capitalize the first letter of each todo task', () => {
//         render(<TodosList userTodos={mockUserTodos} />);

//         expect(screen.getByText('First todo')).toBeInTheDocument();
//         expect(screen.getByText('Second todo')).toBeInTheDocument();
//     });
// });

import React from 'react';

export const TodosList = () => {
    return <div>To modify</div>;
};
