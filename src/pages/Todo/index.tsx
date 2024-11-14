import React, { useMemo } from 'react';
import { TodosHeader } from '../../components/TodosHeader';
import { TodosSidebar } from '../../components/TodosSidebar';
import { TodosList } from '../../components/TodosList';
import useUserTodos from '../../hooks/todo/useUserTodos';
import { Loading } from '../../components/Loading';

export const Todo = () => {
    //TODO: Use redux to store and get this user data
    const userId = 'user1';
    const { userTodos, loading } = useUserTodos(userId);
    const totalTodosCount: number = useMemo(
        () => userTodos.length,
        [userTodos]
    );
    const totalCompletedTodosCount: number = useMemo(
        () => userTodos.filter((todo) => todo.isCompleted).length,
        [userTodos]
    );

    return (
        <React.Fragment>
            {loading && <Loading />}
            <div className="h-screen w-screen bg-primaryBG flex items-center justify-center font-poppins">
                <main className="relative w-[60.5rem] h-[39rem] bg-white rounded-lg overflow-hidden grid grid-rows-[auto_1fr] grid-cols-[1fr_320px] shadow-[0_4px_4px_borderColor]">
                    <TodosHeader
                        totalTodosCount={totalTodosCount}
                        totalCompletedTodosCount={totalCompletedTodosCount}
                    />
                    <TodosList userTodos={userTodos} />
                    <TodosSidebar />
                </main>
            </div>
        </React.Fragment>
    );
};
