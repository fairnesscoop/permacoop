import React from 'react';
import SecuredRoute from '../../auth/components/SecuredRoute';
import Loadable from 'react-loadable';
import LoadingComponent from '../../core/components/LoadingComponent';

const List = Loadable({
  loader: () => import('../views/ListView'),
  loading: LoadingComponent
});

const Add = Loadable({
  loader: () => import('../views/AddView'),
  loading: LoadingComponent
});

export default [
  <SecuredRoute key={'activity'} exact path={'/activities'} component={List} />,
  <SecuredRoute
    key={'activity.add'}
    exact
    path={'/activities/add/:date'}
    component={Add}
  />
];
