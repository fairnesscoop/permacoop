import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch} from 'react-router-dom';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import Layout from './modules/common/components/Layout';
import commonRoutes from './modules/common/routes';
import authRoutes from './modules/auth/routes';
import './i18n';

const {store, persistor} = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout>
          <Switch>
            {authRoutes}
            {commonRoutes}
          </Switch>
        </Layout>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
