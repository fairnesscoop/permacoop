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

const Update = Loadable({
  loader: () => import('../views/UpdateView'),
  loading: LoadingComponent
});

export default [
  <SecuredRoute key={'project'} exact path={'/projects'} component={List} />,
  <SecuredRoute
    key={'project.add'}
    exact
    path={'/projects/add'}
    component={Add}
  />,
  <SecuredRoute
    key={'project.update'}
    exact
    path={'/projects/:id/edit'}
    component={Update}
  />
];
