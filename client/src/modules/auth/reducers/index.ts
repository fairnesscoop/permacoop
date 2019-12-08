import {combineReducers} from 'redux';
import {authenticationReducers} from './authentication';

export default combineReducers({
  authentication: authenticationReducers
});
