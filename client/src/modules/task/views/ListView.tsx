import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {AppState} from '../../../store/reducers';
import {listTasks} from '../middlewares/list';
import {reset} from '../../core/actions/list';
import Breadcrumb from '../../core/components/Breadcrumb';
import ServerErrors from '../../core/components/ServerErrors';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {Task} from '../models/Task';
import {CoreListState, ICoreListResetAction} from '../../core/types/list';

interface IProps {
  list: CoreListState<Task>;
  listTasks(): void;
  reset(): ICoreListResetAction;
}

const ListView: React.FC<IProps> = ({list, listTasks, reset}) => {
  const {t} = useTranslation();

  useEffect(() => {
    listTasks();

    return () => {
      reset();
    };
  }, [listTasks, reset]);

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('task.title'))]} />
          <ServerErrors errors={list.errors} />
          <Link to={'/tasks/add'} className={'btn btn-primary mb-3'}>
            {t('task.add.title')}
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('task.list.title')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map(
                task =>
                  task instanceof Task && (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td></td>
                    </tr>
                  )
              )}
              {0 === list.payload.length && (
                <tr>
                  <td colSpan={2}>{t('task.list.noItems')}</td>
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
    ...bindActionCreators({listTasks, reset}, dispatch)
  })
)(ListView);
