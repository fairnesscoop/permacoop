import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import {CustomerListState, ICustomerListResetAction} from '../types/list';
import {listCustomers} from '../middlewares/list';
import {reset} from '../actions/list';
import Breadcrumb from '../../common/components/Breadcrumb';
import ServerErrors from '../../common/components/ServerErrors';
import {BreadcrumbItem} from '../../common/models/BreadcrumbItem';
import {Customer} from '../models/Customer';

interface IProps {
  list: CustomerListState;
  listCustomers(): void;
  reset(): ICustomerListResetAction;
}

const ListView: React.FC<IProps> = ({list, listCustomers, reset}) => {
  const {t} = useTranslation();

  useEffect(() => {
    listCustomers();

    return () => {
      reset();
    };
  }, [listCustomers, reset]);

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('customer.title'))]} />
          <ServerErrors errors={list.errors} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('customer.title')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map((customer: Customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td></td>
                </tr>
              ))}
              {0 === list.payload.length && (
                <tr>
                  <td colSpan={2}>{t('customer.list.noItems')}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      {list.loading && (
        <Row className={'justify-content-md-center'}>
          <Col md={'auto'}>
            <Spinner animation={'border'} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default connect(
  (state: AppState) => ({
    list: state.customer.list
  }),
  dispatch => ({
    ...bindActionCreators({listCustomers, reset}, dispatch)
  })
)(ListView);
