import React from 'react';
import {Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {IActivity} from '../models/IActivity';
import {dateNormalizer} from '../../../normalizer/date';
import {IActivitiesByDay} from '../models/IActivitiesByDay';

interface IProps {
  activityByDays: IActivitiesByDay;
  canAddActivity: boolean;
}

const ActivityDetail: React.FC<IProps> = ({activityByDays, canAddActivity}) => {
  return (
    <tr className={activityByDays.isWeekend ? 'disabled' : ''}>
      <td>{dateNormalizer(activityByDays.date)}</td>
      <td>
        {activityByDays.activities.map((activity: IActivity) => (
          <div key={activity.id}>
            <Badge variant={'success'}>
              <i className={'fas fa-thumbtack'}></i> {activity.taskName}
            </Badge>{' '}
            <Badge variant={'success'}>
              <i className={'fas fa-clock'}></i> {activity.time / 100}
            </Badge>{' '}
            {activity.projectName}
          </div>
        ))}
      </td>
      <td>
        {true === canAddActivity && false === activityByDays.isWeekend && (
          <Link
            to={`/activities/add/${activityByDays.date}`}
            className={'btn btn-outline-secondary btn-sm'}
          >
            <i className={'fas fa-plus'}></i>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default ActivityDetail;
