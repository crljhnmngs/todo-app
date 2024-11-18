import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../api/apiClient';
import { AddresssDataResponse } from '../commonTypes';
import { COUNTRY_API_BASE_URI } from '../../../lib/const';

export const fetchCountries = createAsyncThunk<
    AddresssDataResponse,
    void,
    { rejectValue: string }
>('country/fetchCountries', async (_, { rejectWithValue }) => {
    try {
        const response = await apiRequest<AddresssDataResponse>(
            COUNTRY_API_BASE_URI,
            'GET',
            undefined,
            {
                headers: {
                    'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_API_APIKEY,
                },
            }
        );
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'An error occurred'
        );
    }
});
