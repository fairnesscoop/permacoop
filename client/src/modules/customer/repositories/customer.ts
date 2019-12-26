import {client as axios} from '../../../utils/axios';
import {ICustomer} from '../models/ICustomer';
import {CustomerFormData} from '../components/form/CustomerForm';

export const findCustomers = async (): Promise<ICustomer[]> => {
  const {data} = await axios.get('customers');

  return data;
};

export const findOneById = async (id: string): Promise<ICustomer> => {
  const {data} = await axios.get(`customers/${id}`);

  return data;
};

export const saveCustomer = async (
  payload: CustomerFormData
): Promise<ICustomer> => {
  let response;

  if (payload.id) {
    response = await axios.put(`customers/${payload.id}`, payload);
  } else {
    response = await axios.post('customers', payload);
  }

  return response.data;
};
