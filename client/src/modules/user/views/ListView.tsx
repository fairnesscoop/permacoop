import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import {UserListState, IUserListResetAction} from '../types/list';
import {listUsers} from '../middlewares/list';
import {reset} from '../actions/list';
import Breadcrumb from '../../common/components/Breadcrumb';
import ServerErrors from '../../common/components/ServerErrors';
import {BreadcrumbItem} from '../../common/models/BreadcrumbItem';
import {User} from '../models/User';

interface IProps {
  list: UserListState;
  listUsers(): void;
  reset(): IUserListResetAction;
}

const ListView: React.FC<IProps> = ({list, listUsers, reset}) => {
  const {t} = useTranslation();

  useEffect(() => {
    listUsers();

    return () => {
      reset();
    };
  }, [listUsers, reset]);

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('user.title'))]} />
          <ServerErrors errors={list.errors} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('user.firstName')}</th>
                <th>{t('user.lastName')}</th>
                <th>{t('user.email')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td></td>
                </tr>
              ))}
              {0 === list.payload.length && (
                <tr>
                  <td colSpan={4}>{t('user.list.noItems')}</td>
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
    list: state.user.list
  }),
  dispatch => ({
    ...bindActionCreators({listUsers, reset}, dispatch)
  })
)(ListView);
