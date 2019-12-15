import React from 'react';
import SecuredRoute from '../../auth/components/SecuredRoute';
import Loadable from 'react-loadable';
import LoadingComponent from '../../core/components/LoadingComponent';

const Dashboard = Loadable({
  loader: () => import('../views/DashboardView'),
  loading: LoadingComponent
});

export default [
  <SecuredRoute key={'dashboard'} exact path={'/'} component={Dashboard} />
];
