import React, {useEffect, useState} from 'react';
import {Field} from 'redux-form';
import {ICustomer} from '../../../models/ICustomer';
import {findCustomers} from '../../../repositories/customer';
import {useTranslation} from 'react-i18next';
import SelectInput from '../../../../core/components/form/SelectInput';

export const CustomerInput: React.FC = () => {
  const {t} = useTranslation();
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const fetchCustomers = async () => {
    setCustomers(await findCustomers());
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Field
      label={t('customer.form.title')}
      name={'customerId'}
      component={SelectInput}
    >
      <option value={''}>{t('customer.form.placeholder')}</option>
      {customers.map((customer: ICustomer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name}
        </option>
      ))}
    </Field>
  );
};
