import {combineReducers} from 'redux';
import {upsertReducers} from './upsert';

export default combineReducers({
  upsert: upsertReducers
});
