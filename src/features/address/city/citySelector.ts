import { RootState } from '../../../store/root';

export const selectCity = (state: RootState) => state.city.data;
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityError = (state: RootState) => state.city.error;
