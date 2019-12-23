import React from 'react';
import {Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {MonthlyActivities} from '../models/MonthlyActivities';
import {Activity} from '../models/Activity';
import {dateNormalizer} from '../../../normalizer/date';

interface IProps {
  monthlyActivities: MonthlyActivities;
}

const ActivityDetail: React.FC<IProps> = ({monthlyActivities}) => {
  return (
    <tr className={monthlyActivities.isWeekend ? 'disabled' : ''}>
      <td>{dateNormalizer(monthlyActivities.date)}</td>
      <td>
        {monthlyActivities.activities.map(
          activity =>
            activity instanceof Activity && (
              <div key={activity.id}>
                <Badge pill variant={'success'}>
                  <i className={'fas fa-thumbtack'}></i> {activity.task.name}
                </Badge>{' '}
                <Badge pill variant={'success'}>
                  <i className={'fas fa-clock'}></i> {activity.time / 100}
                </Badge>{' '}
                {activity.project.fullName}
              </div>
            )
        )}
      </td>
      <td>
        {false === monthlyActivities.isWeekend && (
          <Link
            to={`/activities/add/${monthlyActivities.date}`}
            className={'btn btn-outline-primary btn-sm'}
          >
            <i className={'fas fa-plus'}></i>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default ActivityDetail;
