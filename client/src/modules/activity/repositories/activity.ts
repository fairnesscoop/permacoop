import {client as axios} from '../../../utils/axios';
import {Activity} from '../models/Activity';
import {ActivityFormData} from '../components/form/ActivityForm';
import {ActivityFactory} from '../factory/ActivityFactory';
import {MonthlyActivities} from '../models/MonthlyActivities';
import {ActivitiesByDay} from '../models/ActivitiesByDay';

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
): Promise<MonthlyActivities> => {
  const {data} = await axios.get('activities', {params: {userId, date}});
  const activitiesByDay: ActivitiesByDay[] = [];

  for (const monthlyActivity of data.days) {
    const activities: Activity[] = [];

    for (const activity of monthlyActivity.activities) {
      activities.push(ActivityFactory.create(activity));
    }

    activitiesByDay.push(
      new ActivitiesByDay(
        monthlyActivity.date,
        monthlyActivity.isWeekend,
        activities
      )
    );
  }

  return new MonthlyActivities(data.totalTimeSpent, activitiesByDay);
};
