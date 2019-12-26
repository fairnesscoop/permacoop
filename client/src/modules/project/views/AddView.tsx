import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import ProjectForm, {ProjectFormData} from '../components/form/ProjectForm';
import {reset} from '../../core/actions/upsert';
import {upsertProject} from '../middlewares/upsert';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';

interface IProps {
  upsert: CoreUpsertState;
  reset(): ICoreUpsertResetAction;
  upsertProject(payload: ProjectFormData): void;
}

const AddView: React.FC<IProps> = ({upsertProject, reset, upsert}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: ProjectFormData) => {
    upsertProject(payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

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
              new BreadcrumbItem(t('project.add.title'))
            ]}
          />
          <ServerErrors errors={upsert.errors} />
        </Col>
      </Row>
      <ProjectForm loading={upsert.loading} onSubmit={handleSubmit} />
    </>
  );
};

export default connect(
  (state: AppState) => ({
    upsert: state.core.upsert
  }),
  dispatch => ({
    ...bindActionCreators({reset, upsertProject}, dispatch)
  })
)(AddView);
