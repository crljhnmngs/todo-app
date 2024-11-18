import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressState } from '../commonTypes';
import { fetchCountries } from './countryThunks';

const initialState: AddressState = {
    data: null,
    loading: false,
    error: null,
};

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCountries.fulfilled,
                (state, action: PayloadAction<AddressState['data']>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchCountries.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || 'Unknown error';
                }
            );
    },
});

export default countrySlice.reducer;
