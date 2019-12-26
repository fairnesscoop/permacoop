import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {reset} from '../../core/actions/upsert';
import {reset as resetShow} from '../../core/actions/show';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';
import {upsertCustomer} from '../middlewares/upsert';
import {getCustomer} from '../middlewares/show';
import CustomerForm, {CustomerFormData} from '../components/form/CustomerForm';
import {CoreShowState, ICoreShowResetAction} from '../../core/types/show';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  upsert: CoreUpsertState;
  show: CoreShowState;
  reset(): ICoreUpsertResetAction;
  resetShow(): ICoreShowResetAction;
  upsertCustomer(payload: CustomerFormData): void;
  getCustomer(id: string): void;
}

const UpdateView: React.FC<IProps> = ({
  upsertCustomer,
  resetShow,
  show,
  getCustomer,
  reset,
  match: {
    params: {id}
  },
  upsert
}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: CustomerFormData) => {
    upsertCustomer(payload);
  };

  useEffect(() => {
    getCustomer(id);

    return () => {
      reset();
      resetShow();
    };
  }, [id, getCustomer, reset, resetShow]);

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
              new BreadcrumbItem(
                t('customer.update.title', {name: show.payload?.name})
              )
            ]}
          />
          <ServerErrors errors={[...upsert.errors, ...show.errors]} />
        </Col>
      </Row>
      {show.payload && (
        <CustomerForm
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
      {reset, getCustomer, resetShow, upsertCustomer},
      dispatch
    )
  })
)(UpdateView);
