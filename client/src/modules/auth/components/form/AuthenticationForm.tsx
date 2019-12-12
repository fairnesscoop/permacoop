import React from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import TextInput from '../../../core/components/form/TextInput';
import {validate} from './validator/authentication';

interface IProps {
  loading: boolean;
}

export interface AuthenticationFormData {
  email: string;
  password: string;
}

const AuthenticationForm: React.FC<InjectedFormProps<
  AuthenticationFormData,
  IProps
> &
  IProps> = ({loading, handleSubmit}: any) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={handleSubmit} className={'m-3'}>
          <Field
            name={'email'}
            type={'email'}
            label={t('authentication.form.email')}
            component={TextInput}
          />
          <Field
            name={'password'}
            type={'password'}
            label={t('authentication.form.password')}
            component={TextInput}
          />
          <button
            type={'submit'}
            className={'btn btn-primary'}
            disabled={loading}
          >
            {t('form.buttons.connect')}
          </button>
        </Form>
      </Col>
    </Row>
  );
};

export default reduxForm<AuthenticationFormData, IProps>({
  form: 'login',
  validate
})(AuthenticationForm);
