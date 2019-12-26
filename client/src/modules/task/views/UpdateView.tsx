import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import TaskForm, {TaskFormData} from '../components/form/TaskForm';
import {reset} from '../../core/actions/upsert';
import {reset as showReset} from '../../core/actions/show';
import {upsertTask} from '../middlewares/upsert';
import {getTask} from '../middlewares/show';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';
import {CoreShowState, ICoreShowResetAction} from '../../core/types/show';

interface RouteParam {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParam> {
  show: CoreShowState;
  upsert: CoreUpsertState;
  reset(): ICoreUpsertResetAction;
  showReset(): ICoreShowResetAction;
  upsertTask(payload: TaskFormData): void;
  getTask(id: string): void;
}

const UpdateView: React.FC<IProps> = ({
  upsertTask,
  show,
  showReset,
  getTask,
  reset,
  upsert,
  match: {
    params: {id}
  }
}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: TaskFormData) => {
    upsertTask(payload);
  };

  useEffect(() => {
    getTask(id);

    return () => {
      reset();
      showReset();
    };
  }, [id, getTask, reset, showReset]);

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
              new BreadcrumbItem(
                t('task.update.title', {name: show.payload?.name})
              )
            ]}
          />
          <ServerErrors errors={[...upsert.errors, ...show.errors]} />
        </Col>
      </Row>
      {show.payload && (
        <TaskForm
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
    ...bindActionCreators({reset, getTask, showReset, upsertTask}, dispatch)
  })
)(UpdateView);
