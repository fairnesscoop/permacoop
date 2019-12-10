import {combineReducers} from 'redux';
import {listReducers} from './list';

export default combineReducers({
  list: listReducers
});
