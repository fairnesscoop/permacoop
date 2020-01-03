import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {AppState} from '../../../store/reducers';
import {ILoggedUser} from '../models/ILoggedUser';

interface IProps {
  user: ILoggedUser | null;
  key: string;
  component: any;
  path: string;
  exact: boolean;
}

const SecuredRoute: React.FC<IProps> = (props: any) => {
  if (!props.user) {
    return <Redirect to={'/login'} />;
  }

  return <Route {...props} />;
};

export default connect((state: AppState) => ({
  user: state.auth.authentication.user
}))(SecuredRoute);
