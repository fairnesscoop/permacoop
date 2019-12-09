import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent from '../../common/components/LoadingComponent';
import SecuredRoute from '../../auth/components/SecuredRoute';

const Dashboard = Loadable({
  loader: () => import('../views/DashboardView'),
  loading: LoadingComponent
});

export default [
  <SecuredRoute key={'dashboard'} exact path={'/'} component={Dashboard} />
];
