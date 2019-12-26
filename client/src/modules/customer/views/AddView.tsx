import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {reset} from '../../core/actions/upsert';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';
import {upsertCustomer} from '../middlewares/upsert';
import CustomerForm, {CustomerFormData} from '../components/form/CustomerForm';

interface IProps {
  upsert: CoreUpsertState;
  reset(): ICoreUpsertResetAction;
  upsertCustomer(payload: CustomerFormData): void;
}

const AddView: React.FC<IProps> = ({upsertCustomer, reset, upsert}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: CustomerFormData) => {
    upsertCustomer(payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (upsert.payload) {
    return <Redirect to={'/customers'} />;
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb
            items={[
              new BreadcrumbItem(t('customer.title'), '/customers', false),
              new BreadcrumbItem(t('customer.add.title'))
            ]}
          />
          <ServerErrors errors={upsert.errors} />
        </Col>
      </Row>
      <CustomerForm loading={upsert.loading} onSubmit={handleSubmit} />
    </>
  );
};

export default connect(
  (state: AppState) => ({
    upsert: state.core.upsert
  }),
  dispatch => ({
    ...bindActionCreators({reset, upsertCustomer}, dispatch)
  })
)(AddView);
