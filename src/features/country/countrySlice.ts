import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountryState } from './countryTypes';
import { fetchCountries } from './countryThunks';

const initialState: CountryState = {
    data: null,
    loading: false,
    error: null,
};

const countrySlice = createSlice({
    name: 'user',
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
                (state, action: PayloadAction<CountryState['data']>) => {
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
