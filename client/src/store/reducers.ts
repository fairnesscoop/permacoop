import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from '../modules/auth/reducers';
import core from '../modules/core/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  core
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
