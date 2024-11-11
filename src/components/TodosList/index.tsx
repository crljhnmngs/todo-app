import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';
import { USER_TODOS_COLLECTION } from '../../lib/const';
import { Loading } from '../../components/Loading';

export const TodosList = () => {
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
            <div className="bg-white">
                <ul>
                    {userTodos.map((todo: any, index: number) => (
                        <li
                            className="flex items-center justify-between px-8 h-14 text-sm cursor-pointer border-b border-b-[rgba(0,0,0,0.08)]"
                            key={index}
                        >
                            <span>{todo}</span>
                            <button className="pr-2">❌</button>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
};
