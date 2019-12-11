import React from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import {useTranslation} from 'react-i18next';
import TextInput from '../../../core/components/form/TextInput';
import {SubmitButton} from '../../../core/components/form/SubmitButton';
import {validate} from './validator/customer';
import {Customer} from '../../models/Customer';

interface IProps {
  loading: boolean;
}

const CustomerForm: React.FC<InjectedFormProps<Customer, IProps> & IProps> = ({
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
            label={t('customer.form.name')}
            component={TextInput}
          />
          <SubmitButton loading={loading} />
        </Form>
      </Col>
    </Row>
  );
};

export default reduxForm<Customer, IProps>({form: 'customer', validate})(
  CustomerForm
);
