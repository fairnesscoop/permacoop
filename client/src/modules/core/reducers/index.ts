import {combineReducers} from 'redux';
import {upsertReducers} from './upsert';
import {listReducers} from './list';
import {showReducers} from './show';

export default combineReducers({
  upsert: upsertReducers,
  list: listReducers,
  show: showReducers
});
