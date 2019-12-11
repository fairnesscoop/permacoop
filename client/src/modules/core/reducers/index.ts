import {combineReducers} from 'redux';
import {upsertReducers} from './upsert';
import {listReducers} from './list';

export default combineReducers({
  upsert: upsertReducers,
  list: listReducers
});
