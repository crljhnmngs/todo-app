import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';
import { USER_TODOS_COLLECTION } from '../../lib/const';
import { Loading } from '../../components/Loading';

export const Todo = () => {
    const [userTodos, setUserTodos] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserTodos = async () => {
            try {
                const todosRef = ref(db, USER_TODOS_COLLECTION);
                setLoading(true);
                const snapshot = await get(todosRef);
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const userTodosList = Object.values(usersData);
                    setUserTodos(userTodosList);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTodos();
    }, []);

    return (
        <React.Fragment>
            {loading && <Loading />}
            <div className="h-screen w-screen bg-primaryBG flex items-center justify-center font-poppins">
                <main className="relative w-[60.5rem] h-[39rem] bg-white rounded-lg overflow-hidden">
                    {/*
                        Header
                        TodoList
                        Sidebar
                    */}
                    <ul>
                        {userTodos.map((todo: any, index: number) => (
                            <li key={index}>{todo}</li>
                        ))}
                    </ul>
                </main>
            </div>
        </React.Fragment>
    );
};
