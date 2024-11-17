import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../api/apiClient';
import { CountryDataResponse } from './countryTypes';
import { COUNTRY_API_BASE_URI } from '../../lib/const';

export const fetchCountries = createAsyncThunk<
    CountryDataResponse,
    void,
    { rejectValue: string }
>('country/fetchCountries', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<CountryDataResponse>(
            COUNTRY_API_BASE_URI,
            'GET',
            {
                headers: {
                    'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_API_APIKEY,
                },
            }
        );
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'An error occurred'
        );
    }
});
