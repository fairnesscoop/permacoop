import React from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {useTranslation} from 'react-i18next';
import TextInput from '../../../core/components/form/TextInput';
import {SubmitButton} from '../../../core/components/form/SubmitButton';
import {validate} from './validator/project';
import {CustomerInput} from '../../../customer/components/form/input/CustomerInput';

interface IProps {
  loading: boolean;
}

export interface ProjectFormData {
  name: string;
  customerId: string;
}

const ProjectForm: React.FC<InjectedFormProps<ProjectFormData, IProps> &
  IProps> = ({handleSubmit, loading}) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={handleSubmit} className={'m-3'}>
          <Field
            name={'name'}
            label={t('project.form.name')}
            component={TextInput}
          />
          <CustomerInput />
          <SubmitButton loading={loading} />
        </Form>
      </Col>
    </Row>
  );
};

export default reduxForm<ProjectFormData, IProps>({form: 'project', validate})(
  ProjectForm
);
