import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import TaskForm, {TaskFormData} from '../components/form/TaskForm';
import {reset} from '../../core/actions/upsert';
import {upsertTask} from '../middlewares/upsert';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';

interface IProps {
  upsert: CoreUpsertState;
  reset(): ICoreUpsertResetAction;
  upsertTask(payload: TaskFormData, id?: string): void;
}

const AddView: React.FC<IProps> = ({upsertTask, reset, upsert}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: TaskFormData) => {
    upsertTask(payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (upsert.payload) {
    return <Redirect to={'/tasks'} />;
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb
            items={[
              new BreadcrumbItem(t('task.title'), '/tasks', false),
              new BreadcrumbItem(t('task.add.title'))
            ]}
          />
          <ServerErrors errors={upsert.errors} />
        </Col>
      </Row>
      <TaskForm loading={upsert.loading} onSubmit={handleSubmit} />
    </>
  );
};

export default connect(
  (state: AppState) => ({
    upsert: state.core.upsert
  }),
  dispatch => ({
    ...bindActionCreators({reset, upsertTask}, dispatch)
  })
)(AddView);
