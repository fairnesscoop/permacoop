import React from 'react';
import {useTranslation} from 'react-i18next';
import {Form, Col, Row} from 'react-bootstrap';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import {validate} from './validator/activity';
import TextInput from '../../../core/components/form/TextInput';
import {SubmitButton} from '../../../core/components/form/SubmitButton';
import SelectInput from '../../../core/components/form/SelectInput';
import {TaskInput} from '../../../task/components/form/input/TaskInput';
import {ProjectInput} from '../../../project/components/form/input/ProjectInput';

interface IProps {
  loading: boolean;
}

export interface ActivityFormData {
  id?: string;
  time: number;
  date: Date;
  summary: number;
  taskId: string;
  projectId: string;
}

const ActivityForm: React.FC<InjectedFormProps<ActivityFormData, IProps> &
  IProps> = ({handleSubmit, loading}) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={handleSubmit} className={'m-3'}>
          <Field
            name={'date'}
            type={'date'}
            label={t('activity.form.date')}
            component={TextInput}
          />
          <Field
            name={'time'}
            label={t('activity.form.time')}
            component={SelectInput}
          >
            <option value={''}>{t('activity.form.placeholder')}</option>
            <option value={25}>0.25</option>
            <option value={50}>0.5</option>
            <option value={75}>0.75</option>
            <option value={100}>1</option>
          </Field>
          <ProjectInput />
          <TaskInput />
          <Field
            name={'summary'}
            label={t('activity.form.summary')}
            component={TextInput}
          />
          <SubmitButton loading={loading} />
        </Form>
      </Col>
    </Row>
  );
};

export default reduxForm<ActivityFormData, IProps>({
  form: 'activity',
  validate
})(ActivityForm);
