import {client as axios} from '../../../utils/axios';
import {IActivity} from '../models/IActivity';
import {ActivityFormData} from '../components/form/ActivityForm';
import {IMonthlyActivities} from '../models/IMonthlyActivities';

export const saveActivity = async (
  payload: ActivityFormData
): Promise<IActivity> => {
  let response;

  if (payload.id) {
    response = await axios.put(`activities/${payload.id}`, payload);
  } else {
    response = await axios.post('activities', payload);
  }

  return response.data;
};

export const findActivities = async (
  userId: string,
  date: Date
): Promise<IMonthlyActivities> => {
  const {data} = await axios.get('activities', {params: {userId, date}});

  return data;
};
