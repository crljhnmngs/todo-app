import { RootState } from '../../store/root';

export const selectCountry = (state: RootState) => state.country.data;
export const selectCountryLoading = (state: RootState) => state.country.loading;
export const selectCountryError = (state: RootState) => state.country.error;
