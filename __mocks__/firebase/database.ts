export const getDatabase = jest.fn(() => 'mockDatabase');
export const ref = jest.fn(() => 'mockRef');
export const set = jest.fn(() => Promise.resolve());
export const push = jest.fn(() => ({ key: 'mockTodoId' }));
export const onValue = jest.fn((ref, callback) => {
    callback({
        exists: () => true,
        val: () => ({
            mockTodoId: { task: 'Sample Todo', isCompleted: false },
        }),
    });
});
export const off = jest.fn();
export const remove = jest.fn(() => Promise.resolve());
export const update = jest.fn(() => Promise.resolve());
