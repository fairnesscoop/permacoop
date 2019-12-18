import {client as axios} from '../../../utils/axios';
import {Activity} from '../models/Activity';
import {ActivityFormData} from '../components/form/ActivityForm';
import {ActivityFactory} from '../factory/ActivityFactory';

export const saveActivity = async (
  payload: ActivityFormData
): Promise<Activity> => {
  let response;

  if (payload.id) {
    response = await axios.put(`activities/${payload.id}`, payload);
  } else {
    response = await axios.post('activities', payload);
  }

  return ActivityFactory.create(response.data);
};
