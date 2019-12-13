import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch} from 'react-router-dom';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import Layout from './modules/core/components/Layout';
import taskRoutes from './modules/task/routes';
import projectRoutes from './modules/project/routes';
import customerRoutes from './modules/customer/routes';
import userRoutes from './modules/user/routes';
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
            {taskRoutes}
            {customerRoutes}
            {projectRoutes}
            {userRoutes}
          </Switch>
        </Layout>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
