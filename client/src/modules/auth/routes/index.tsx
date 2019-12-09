import React from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../../common/components/LoadingComponent';

const Authentication = Loadable({
  loader: () => import('../views/AuthenticationView'),
  loading: LoadingComponent
});

export default [
  <Route
    key={'authentication'}
    exact
    path={'/login'}
    component={Authentication}
  />
];
