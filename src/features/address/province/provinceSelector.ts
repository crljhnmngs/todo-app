import { RootState } from '../../../store/root';

export const selectProvince = (state: RootState) => state.province.data;
export const selectProvinceLoading = (state: RootState) =>
    state.province.loading;
export const selectProvinceError = (state: RootState) => state.province.error;
