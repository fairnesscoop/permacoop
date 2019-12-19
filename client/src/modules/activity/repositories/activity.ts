import {client as axios} from '../../../utils/axios';
import {Activity} from '../models/Activity';
import {ActivityFormData} from '../components/form/ActivityForm';
import {ActivityFactory} from '../factory/ActivityFactory';
import {MonthlyActivities} from '../models/MonthlyActivities';

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

export const findActivities = async (
  userId: string,
  date: Date
): Promise<MonthlyActivities[]> => {
  const response = await axios.get('activities', {params: {userId, date}});
  const monthlyActivities: MonthlyActivities[] = [];

  for (const monthlyActivity of response.data) {
    const activities: Activity[] = [];

    for (const activity of monthlyActivity.activities) {
      activities.push(ActivityFactory.createWithCustomer(activity));
    }

    monthlyActivities.push(
      new MonthlyActivities(
        monthlyActivity.date,
        monthlyActivity.isWeekend,
        activities
      )
    );
  }

  return monthlyActivities;
};
