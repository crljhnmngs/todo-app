import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebar: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
