import { combineReducers } from 'redux';
import countryReducer from '../features/address/country/countrySlice';
import provinceReducer from '../features/address/province/provinceSlice';
import cityReducer from '../features/address//city/citySlice';

export const rootReducer = combineReducers({
    country: countryReducer,
    province: provinceReducer,
    city: cityReducer,
});
