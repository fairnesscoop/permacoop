import {combineReducers} from 'redux';
import {listReducers} from './list';
import {upsertReducers} from './upsert';

export default combineReducers({
  upsert: upsertReducers,
  list: listReducers
});
