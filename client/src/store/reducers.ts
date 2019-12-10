import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from '../modules/auth/reducers';
import task from '../modules/task/reducers';
import customer from '../modules/customer/reducers';
import user from '../modules/user/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  customer,
  user,
  task
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
