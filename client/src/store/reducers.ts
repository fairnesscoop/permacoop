import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from '../modules/auth/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
