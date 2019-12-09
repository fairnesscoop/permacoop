import React from 'react';
import SecuredRoute from '../../auth/components/SecuredRoute';
import Loadable from 'react-loadable';
import LoadingComponent from '../../common/components/LoadingComponent';

const List = Loadable({
  loader: () => import('../views/ListView'),
  loading: LoadingComponent
});

export default [
  <SecuredRoute key={'task'} exact path={'/tasks'} component={List} />
];
