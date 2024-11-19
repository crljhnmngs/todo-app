import { useState } from 'react';
import { loginUser } from '../../firebase/auth/authService';
import { LoginFormData } from '../../types';
import { customToast } from '../../lib/utils';

export const useLoginUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);
        setSuccess(false);
        try {
            const result = await loginUser(data.email, data.password);
            if (!result.success) {
                customToast({
                    message: result.message,
                    type: 'error',
                });
                setLoading(false);
                return;
            }
            setSuccess(true);
        } catch (err) {
            customToast({
                message: 'An unexpected error occurred. Please try again.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogin,
        success,
        loading,
    };
};
