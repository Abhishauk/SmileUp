import { combineReducers } from 'redux';
import { authSlice } from './state';

const reducers = combineReducers({
  authslice: authSlice 
});

export default reducers;
    