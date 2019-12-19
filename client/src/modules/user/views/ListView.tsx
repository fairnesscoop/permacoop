import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import {listUsers} from '../middlewares/list';
import {reset} from '../../core/actions/list';
import Breadcrumb from '../../core/components/Breadcrumb';
import ServerErrors from '../../core/components/ServerErrors';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {User} from '../models/User';
import {CoreListState, ICoreListResetAction} from '../../core/types/list';

interface IProps {
  list: CoreListState<User>;
  listUsers(): void;
  reset(): ICoreListResetAction;
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
          <Link to={'/users/add'} className={'btn btn-primary mb-3'}>
            <i className={'fas fa-plus'}></i> {t('user.add.title')}
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('user.firstName')}</th>
                <th>{t('user.lastName')}</th>
                <th>{t('user.email')}</th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map(
                user =>
                  user instanceof User && (
                    <tr key={user.id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                    </tr>
                  )
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
    ...bindActionCreators({listUsers, reset}, dispatch)
  })
)(ListView);
