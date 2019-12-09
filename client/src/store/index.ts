import {createStore, applyMiddleware, compose, Store} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import {client, axiosMiddleware} from '../utils/axios';

const persistConfig = {
  key: 'cooperp',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const buildStore = (): Store => {
  const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(client), axiosMiddleware(client))
    )
  );
};

export default () => {
  const store = buildStore();
  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
};
