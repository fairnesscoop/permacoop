import React from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {useTranslation} from 'react-i18next';
import TextInput from '../../../core/components/form/TextInput';
import {SubmitButton} from '../../../core/components/form/SubmitButton';
import {validate} from './validator/user';

interface IProps {
  loading: boolean;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserForm: React.FC<InjectedFormProps<UserFormData, IProps> & IProps> = ({
  handleSubmit,
  loading
}) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={handleSubmit} className={'m-3'}>
          <Field
            name={'firstName'}
            label={t('user.form.firstName')}
            component={TextInput}
          />
          <Field
            name={'lastName'}
            label={t('user.form.lastName')}
            component={TextInput}
          />
          <Field
            name={'email'}
            type={'email'}
            label={t('user.form.email')}
            component={TextInput}
          />
          <Field
            name={'password'}
            type={'password'}
            label={t('user.form.password')}
            component={TextInput}
          />
          <Field
            name={'confirmPassword'}
            type={'password'}
            label={t('user.form.confirmPassword')}
            component={TextInput}
          />
          <SubmitButton loading={loading} />
        </Form>
      </Col>
    </Row>
  );
};

export default reduxForm<UserFormData, IProps>({form: 'user', validate})(
  UserForm
);
