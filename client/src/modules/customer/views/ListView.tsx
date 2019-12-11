import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import {listCustomers} from '../middlewares/list';
import {reset} from '../../core/actions/list';
import Breadcrumb from '../../core/components/Breadcrumb';
import ServerErrors from '../../core/components/ServerErrors';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {Customer} from '../models/Customer';
import {CoreListState, ICoreListResetAction} from '../../core/types/list';

interface IProps {
  list: CoreListState<Customer>;
  listCustomers(): void;
  reset(): ICoreListResetAction;
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
                <th>{t('customer.list.title')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map(
                customer =>
                  customer instanceof Customer && (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td></td>
                    </tr>
                  )
              )}
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
    list: state.core.list
  }),
  dispatch => ({
    ...bindActionCreators({listCustomers, reset}, dispatch)
  })
)(ListView);
