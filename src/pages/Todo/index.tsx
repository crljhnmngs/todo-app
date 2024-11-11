import React from 'react';
import { TodosHeader } from '../../components/TodosHeader';
import { TodosSidebar } from '../../components/TodosSidebar';
import { TodosList } from '../../components/TodosList';

export const Todo = () => {
    return (
        <div className="h-screen w-screen bg-primaryBG flex items-center justify-center font-poppins">
            <main className="relative w-[60.5rem] h-[39rem] bg-white rounded-lg overflow-hidden grid grid-rows-[auto_1fr] grid-cols-[1fr_320px] shadow-[0_4px_4px_rgb(0,0,0,0.08)]">
                <TodosHeader />
                <TodosList />
                <TodosSidebar />
            </main>
        </div>
    );
};
