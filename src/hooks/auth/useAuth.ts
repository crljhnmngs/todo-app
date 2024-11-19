import { useContext } from 'react';
import { AuthContextProps } from '../../types';
import { AuthContext } from '../../contexts/auth/AuthContext';

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};