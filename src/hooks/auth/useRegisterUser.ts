import { useState } from 'react';
import { registerUser, saveUserInfo } from '../../firebase/auth/authService';
import { RegisterFormData } from '../../types';
import { customToast } from '../../lib/utils';
import { deleteUser } from 'firebase/auth';

export const useRegisterUser = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            const result = await registerUser(data.email, data.password);
            if (!result.success) {
                customToast({
                    message: result.message,
                    type: 'error',
                });
                setLoading(false);
                return;
            }

            const saveResult = await saveUserInfo(result.user.uid, data);
            if (!saveResult.success) {
                await deleteUser(result.user);
                customToast({
                    message: saveResult.message,
                    type: 'error',
                });
                setLoading(false);
                return;
            } else {
                customToast({
                    message: saveResult.message,
                    type: 'success',
                });
            }
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
        handleRegister,
        loading,
    };
};
