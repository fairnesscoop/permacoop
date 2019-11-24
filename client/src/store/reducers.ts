import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
