import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import UserForm, {UserFormData} from '../components/form/UserForm';
import {reset} from '../../core/actions/upsert';
import {reset as resetShow} from '../../core/actions/show';
import {upsertUser} from '../middlewares/upsert';
import {getCurrentUser} from '../middlewares/profil';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';
import {CoreShowState, ICoreShowResetAction} from '../../core/types/show';

interface IProps {
  upsert: CoreUpsertState;
  show: CoreShowState;
  reset(): ICoreUpsertResetAction;
  resetShow(): ICoreShowResetAction;
  upsertUser(payload: UserFormData): void;
  getCurrentUser(): void;
}

const ProfileView: React.FC<IProps> = ({
  upsertUser,
  reset,
  resetShow,
  getCurrentUser,
  show,
  upsert
}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: UserFormData) => {
    upsertUser(payload);
  };

  useEffect(() => {
    getCurrentUser();

    return () => {
      reset();
      resetShow();
    };
  }, [reset, getCurrentUser, resetShow]);

  if (upsert.payload) {
    return <Redirect to={'/'} />;
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('user.profil.title'))]} />
          <ServerErrors errors={[...upsert.errors, ...show.errors]} />
        </Col>
      </Row>
      {show.payload && (
        <UserForm
          initialValues={show.payload}
          loading={upsert.loading}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default connect(
  (state: AppState) => ({
    upsert: state.core.upsert,
    show: state.core.show
  }),
  dispatch => ({
    ...bindActionCreators(
      {reset, resetShow, getCurrentUser, upsertUser},
      dispatch
    )
  })
)(ProfileView);
