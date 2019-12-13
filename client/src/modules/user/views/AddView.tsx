import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import UserForm, {UserFormData} from '../components/form/UserForm';
import {User} from '../models/User';
import {reset} from '../../core/actions/upsert';
import {upsertUser} from '../middlewares/upsert';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';

interface IProps {
  upsert: CoreUpsertState<User>;
  reset(): ICoreUpsertResetAction;
  upsertUser(payload: UserFormData, id?: string): void;
}

const AddView: React.FC<IProps> = ({upsertUser, reset, upsert}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: UserFormData) => {
    upsertUser(payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (upsert.payload) {
    return <Redirect to={'/users'} />;
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb
            items={[
              new BreadcrumbItem(t('user.title'), '/users', false),
              new BreadcrumbItem(t('user.add.title'))
            ]}
          />
          <ServerErrors errors={upsert.errors} />
        </Col>
      </Row>
      <UserForm loading={upsert.loading} onSubmit={handleSubmit} />
    </>
  );
};

export default connect(
  (state: AppState) => ({
    upsert: state.core.upsert
  }),
  dispatch => ({
    ...bindActionCreators({reset, upsertUser}, dispatch)
  })
)(AddView);
