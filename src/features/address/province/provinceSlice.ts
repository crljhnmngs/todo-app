import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressState } from '../commonTypes';
import { fetchProvinces } from './provinceThunks';

const initialState: AddressState = {
    data: null,
    loading: false,
    error: null,
};

const provinceSlice = createSlice({
    name: 'rovince',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProvinces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchProvinces.fulfilled,
                (state, action: PayloadAction<AddressState['data']>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchProvinces.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || 'Unknown error';
                }
            );
    },
});

export default provinceSlice.reducer;
