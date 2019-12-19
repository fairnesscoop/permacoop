import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {AppState} from '../../../store/reducers';
import {listProjects} from '../middlewares/list';
import {reset} from '../../core/actions/list';
import Breadcrumb from '../../core/components/Breadcrumb';
import ServerErrors from '../../core/components/ServerErrors';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {Project} from '../models/Project';
import {CoreListState, ICoreListResetAction} from '../../core/types/list';

interface IProps {
  list: CoreListState<Project>;
  listProjects(): void;
  reset(): ICoreListResetAction;
}

const ListView: React.FC<IProps> = ({list, listProjects, reset}) => {
  const {t} = useTranslation();

  useEffect(() => {
    listProjects();

    return () => {
      reset();
    };
  }, [listProjects, reset]);

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('project.title'))]} />
          <ServerErrors errors={list.errors} />
          <Link to={'/projects/add'} className={'btn btn-primary mb-3'}>
            <i className={'fas fa-plus'}></i> {t('project.add.title')}
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('customer.list.title')}</th>
                <th>{t('project.list.title')}</th>
                <th style={{width: '10%'}}></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map(
                project =>
                  project instanceof Project && (
                    <tr key={project.id}>
                      <td>{project?.customer?.name}</td>
                      <td>{project.name}</td>
                      <td>
                        <Link
                          to={`/projects/${project.id}/edit`}
                          className={'btn btn-outline-secondary btn-sm'}
                        >
                          {t('form.buttons.update')}
                        </Link>
                      </td>
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
    ...bindActionCreators({listProjects, reset}, dispatch)
  })
)(ListView);
