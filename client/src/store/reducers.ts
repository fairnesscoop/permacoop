import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from '../modules/auth/reducers';
import task from '../modules/task/reducers';
import customer from '../modules/customer/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  customer,
  task
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
