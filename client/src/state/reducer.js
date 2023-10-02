import { combineReducers } from 'redux';
import { authSlice } from './slice';

const reducers = combineReducers({
  authslice: authSlice.reducer 
});

export default reducers;