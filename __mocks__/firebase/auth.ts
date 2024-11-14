export const getAuth = jest.fn(() => ({
    currentUser: { uid: 'mockUserId', email: 'test@example.com' },
}));

export const signInWithEmailAndPassword = jest.fn(() =>
    Promise.resolve({ user: { uid: 'mockUserId' } })
);
export const createUserWithEmailAndPassword = jest.fn(() =>
    Promise.resolve({ user: { uid: 'mockUserId' } })
);
export const signOut = jest.fn(() => Promise.resolve());
