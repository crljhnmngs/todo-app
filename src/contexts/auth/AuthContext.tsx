import React, { createContext, useState, useEffect } from 'react';
import {
    onAuthStateChange,
    getCurrentUser,
} from '../../firebase/auth/authService';
import { User } from 'firebase/auth';
import { AuthContextProps } from '../../types';

export const AuthContext = createContext<AuthContextProps | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(getCurrentUser());

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
