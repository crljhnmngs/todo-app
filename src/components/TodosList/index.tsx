import React, { useState } from 'react';
import { Loading } from '../../components/Loading';
import { Todo, TodosListProps } from '../../types';
import { capitalizeFirstLetter } from '../../lib/utils';
import useDeleteTodo from '../../hooks/todo/useDeleteTodo';
import { useUpdateTodoStatus } from '../../hooks/todo/useUpdateTodoStatus';
import { useAuth } from '../../hooks/auth/useAuth';

export const TodosList = ({ userTodos }: TodosListProps) => {
    const { user } = useAuth();
    const userId = user?.uid ?? '';
    const [loading, setLoading] = useState<boolean>(false);
    const { handleDeleteTodo } = useDeleteTodo({ userId, setLoading });
    const { handleUpdateTodoStatus } = useUpdateTodoStatus({
        userId,
        setLoading,
    });

    return (
        <React.Fragment>
            {loading && <Loading />}
            <div className="bg-white h-[90%] md:h-full overflow-auto">
                {userTodos.length === 0 && (
                    <p className="h-full flex justify-center items-center font-semibold">
                        Start by adding a todo
                    </p>
                )}
                <ul>
                    {userTodos.map((todo: Todo, index: number) => (
                        <li
                            className="flex items-center justify-between px-8 h-14 text-sm cursor-pointer border-b border-b-[rgba(0,0,0,0.08)]"
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateTodoStatus(
                                    todo.id,
                                    !todo.isCompleted
                                );
                            }}
                        >
                            <span
                                className={`${todo.isCompleted && 'line-through text-[#ccc]'}`}
                            >
                                {capitalizeFirstLetter(todo.task)}
                            </span>
                            <button
                                className="pr-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTodo(todo.id);
                                }}
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
};
