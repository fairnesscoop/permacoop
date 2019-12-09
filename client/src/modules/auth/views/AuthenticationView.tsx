import React, {useEffect} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthenticationForm from '../components/form/AuthenticationForm';
import {
  IAuthenticationForm,
  AuthenticationState,
  IAuthenticationResetAction
} from '../types/authentication';
import {authenticate} from '../middlewares/authentication';
import {reset} from '../actions/authentication';
import {AppState} from '../../../store/reducers';
import ServerErrors from '../../common/components/ServerErrors';

interface IProps {
  authentication: AuthenticationState;
  authenticate(payload: IAuthenticationForm): void;
  reset(): IAuthenticationResetAction;
}

const AuthenticationView: React.FC<IProps> = ({
  authentication,
  authenticate,
  reset
}) => {
  const handleSubmit = (payload: IAuthenticationForm) => {
    authenticate(payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (authentication.user) {
    return <Redirect to={'/'} />;
  }

  return (
    <>
      <ServerErrors errors={authentication.errors} />
      <AuthenticationForm
        loading={authentication.loading}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default connect(
  (state: AppState) => ({
    authentication: state.auth.authentication
  }),
  dispatch => ({...bindActionCreators({authenticate, reset}, dispatch)})
)(AuthenticationView);
