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

const Profile = Loadable({
  loader: () => import('../views/ProfileView'),
  loading: LoadingComponent
});

export default [
  <SecuredRoute key={'user'} exact path={'/users'} component={List} />,
  <SecuredRoute key={'user.add'} exact path={'/users/add'} component={Add} />,
  <SecuredRoute key={'profile'} exact path={'/profile'} component={Profile} />
];
