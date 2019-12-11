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
  <SecuredRoute key={'task'} exact path={'/tasks'} component={List} />,
  <SecuredRoute key={'task.add'} exact path={'/tasks/add'} component={Add} />
];
