import { auth, db } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { handleError } from '../../lib/utils';
import { RegisterFormData, AuthResponse } from '../../types';
import { TODO_APP_COLLECTION } from '../../lib/const';

export const registerUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return {
            success: true,
            user: userCredential.user,
            message: 'Registration successful',
        };
    } catch (error: any) {
        return handleError(error.code, 'registration') as AuthResponse;
    }
};

export const saveUserInfo = async (
    userId: string,
    data: Omit<RegisterFormData, 'password' | 'confirmPassword'>
) => {
    try {
        const userInfo = {
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender,
            age: data.age,
            country: data.country,
            province: data.province,
            city: data.city,
            email: data,
        };

        const userRef = ref(db, `${TODO_APP_COLLECTION}/users/${userId}`);
        await set(userRef, userInfo);
        return { success: true, message: 'Registration successful' };
    } catch (error) {
        return handleError(error, 'registration');
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return {
            success: true,
            user: userCredential.user,
            message: 'Login successful',
        };
    } catch (error) {
        return handleError(error, 'logging in');
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true, message: 'Logout successful' };
    } catch (error) {
        return handleError(error, 'logging out');
    }
};
