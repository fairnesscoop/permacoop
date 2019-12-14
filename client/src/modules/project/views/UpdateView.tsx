import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import ProjectForm, {ProjectFormData} from '../components/form/ProjectForm';
import {Project} from '../models/Project';
import {reset} from '../../core/actions/upsert';
import {reset as showReset} from '../../core/actions/show';
import {upsertProject} from '../middlewares/upsert';
import {getProject} from '../middlewares/show';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';
import {CoreShowState, ICoreShowResetAction} from '../../core/types/show';

interface RouteParam {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParam> {
  show: CoreShowState<Project>;
  upsert: CoreUpsertState<Project>;
  reset(): ICoreUpsertResetAction;
  showReset(): ICoreShowResetAction;
  upsertProject(payload: ProjectFormData): void;
  getProject(id: string): void;
}

const UpdateView: React.FC<IProps> = ({
  upsertProject,
  show,
  showReset,
  getProject,
  reset,
  upsert,
  match: {
    params: {id}
  }
}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: ProjectFormData) => {
    upsertProject(payload);
  };

  useEffect(() => {
    getProject(id);

    return () => {
      reset();
      showReset();
    };
  }, [id, getProject, reset, showReset]);

  if (upsert.payload) {
    return <Redirect to={'/projects'} />;
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb
            items={[
              new BreadcrumbItem(t('project.title'), '/projects', false),
              new BreadcrumbItem(
                t('project.update.title', {name: show.payload?.name})
              )
            ]}
          />
          <ServerErrors errors={[...upsert.errors, ...show.errors]} />
        </Col>
      </Row>
      {show.payload && (
        <ProjectForm
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
      {reset, getProject, showReset, upsertProject},
      dispatch
    )
  })
)(UpdateView);
