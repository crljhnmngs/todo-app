import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressState } from '../commonTypes';
import { fetchCities } from './cityThunks';

const initialState: AddressState = {
    data: null,
    loading: false,
    error: null,
};

const citySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCities.fulfilled,
                (state, action: PayloadAction<AddressState['data']>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchCities.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || 'Unknown error';
                }
            );
    },
});

export default citySlice.reducer;
