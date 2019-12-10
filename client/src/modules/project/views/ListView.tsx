import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import {ProjectListState, IProjectListResetAction} from '../types/list';
import {listProjects} from '../middlewares/list';
import {reset} from '../actions/list';
import Breadcrumb from '../../common/components/Breadcrumb';
import ServerErrors from '../../common/components/ServerErrors';
import {BreadcrumbItem} from '../../common/models/BreadcrumbItem';
import {Project} from '../models/Project';

interface IProps {
  list: ProjectListState;
  listProjects(): void;
  reset(): IProjectListResetAction;
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('project.title')}</th>
                <th>{t('customer.title')}</th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map((project: Project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.customer.name}</td>
                </tr>
              ))}
              {0 === list.payload.length && (
                <tr>
                  <td colSpan={2}>{t('project.list.noItems')}</td>
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
    list: state.project.list
  }),
  dispatch => ({
    ...bindActionCreators({listProjects, reset}, dispatch)
  })
)(ListView);
