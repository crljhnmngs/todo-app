import React, { useState } from 'react';
import { Loading } from '../../components/Loading';
import useUserTodos from '../../hooks/Todo/useUserTodos';
import { Todo } from '../../types';
import { capitalizeFirstLetter } from '../../lib/utils';
import useDeleteTodo from '../../hooks/Todo/userDeleteTodo';
import { useUpdateTodoStatus } from '../../hooks/Todo/useUpdateTodoStatus';

export const TodosList = () => {
    //TODO: Use redux to store and get this user data
    const userId = 'user1';
    const [loading, setLoading] = useState<boolean>(false);
    const { userTodos } = useUserTodos({ userId, setLoading });
    const { handleDeleteTodo } = useDeleteTodo({ userId, setLoading });
    const { handleUpdateTodoStatus } = useUpdateTodoStatus({
        userId,
        setLoading,
    });

    return (
        <React.Fragment>
            {loading && <Loading />}
            <div className="bg-white">
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
