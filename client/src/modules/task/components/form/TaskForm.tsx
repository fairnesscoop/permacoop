import React from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {useTranslation} from 'react-i18next';
import TextInput from '../../../core/components/form/TextInput';
import {SubmitButton} from '../../../core/components/form/SubmitButton';
import {validate} from '../../components/form/validator/task';

interface IProps {
  loading: boolean;
}

export interface TaskFormData {
  id?: string;
  name: string;
}

const TaskForm: React.FC<InjectedFormProps<TaskFormData, IProps> & IProps> = ({
  handleSubmit,
  loading
}) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={handleSubmit} className={'m-3'}>
          <Field
            name={'name'}
            label={t('task.form.name')}
            component={TextInput}
          />
          <SubmitButton loading={loading} />
        </Form>
      </Col>
    </Row>
  );
};

export default reduxForm<TaskFormData, IProps>({form: 'task', validate})(
  TaskForm
);
