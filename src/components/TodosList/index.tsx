import React from 'react';
import { Loading } from '../../components/Loading';
import useUserTodos from '../../hooks/useUserTodos';
import { Todo } from '../../types';
import { toast, Bounce } from 'react-toastify';
import { capitalizeFirstLetter } from '../../lib/utils';

export const TodosList = () => {
    //TODO: Use redux to store and get this user data
    const userId = 'user1';
    const { userTodos, loading, error } = useUserTodos(userId);
    //TODO: Create a custom component for toast
    if (error) {
        toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            transition: Bounce,
        });
    }
    return (
        <React.Fragment>
            {loading && <Loading />}
            <div className="bg-white">
                <ul>
                    {userTodos.map((todo: Todo, index: number) => (
                        <li
                            className="flex items-center justify-between px-8 h-14 text-sm cursor-pointer border-b border-b-[rgba(0,0,0,0.08)]"
                            key={index}
                        >
                            <span
                                className={`${todo.isCompleted && 'line-through'}`}
                            >
                                {capitalizeFirstLetter(todo.task)}
                            </span>
                            <button className="pr-2">❌</button>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
};
