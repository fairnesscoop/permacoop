import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../common/components/Breadcrumb';
import {BreadcrumbItem} from '../../common/models/BreadcrumbItem';
import TaskForm from '../components/form/TaskForm';
import {Task} from '../models/Task';
import {TaskUpsertState, ITaskUpsertResetAction} from '../types/upsert';
import {reset} from '../actions/upsert';
import {upsertTask} from '../middlewares/upsert';
import ServerErrors from '../../common/components/ServerErrors';

interface IProps {
  upsert: TaskUpsertState;
  reset(): ITaskUpsertResetAction;
  upsertTask(payload: Task): void;
}

const AddView: React.FC<IProps> = ({upsertTask, reset, upsert}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: Task) => {
    upsertTask(payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  });

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
    upsert: state.task.upsert
  }),
  dispatch => ({
    ...bindActionCreators({reset, upsertTask}, dispatch)
  })
)(AddView);
