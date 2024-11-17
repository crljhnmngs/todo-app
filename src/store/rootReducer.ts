import { combineReducers } from 'redux';
import countryReducer from '../features/country/countrySlice';
export const rootReducer = combineReducers({
    country: countryReducer,
});
