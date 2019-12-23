import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {History} from 'history';
import {format} from 'date-fns';
import {bindActionCreators} from 'redux';
import {Spinner, Row, Col, Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import {listActivities} from '../middlewares/list';
import {reset} from '../../core/actions/list';
import Breadcrumb from '../../core/components/Breadcrumb';
import ServerErrors from '../../core/components/ServerErrors';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {CoreListState, ICoreListResetAction} from '../../core/types/list';
import {LoggedUser} from '../../auth/models/LoggedUser';
import {MonthlyActivities} from '../models/MonthlyActivities';
import ActivityDetail from '../components/ActivityDetail';
import {useQuery} from '../../core/hooks/query';
import {UserFilter} from '../../user/components/filter/UserFilter';
import {monthNormalizer} from '../../../normalizer/date';

interface IProps {
  list: CoreListState<MonthlyActivities>;
  user: LoggedUser | null;
  listActivities(userId: string, date: Date): void;
  reset(): ICoreListResetAction;
  history: History;
}

const ListView: React.FC<IProps> = ({
  list,
  listActivities,
  user,
  reset,
  history
}) => {
  const {t} = useTranslation();
  const query = useQuery();
  const userId = query.get('userId') || user?.id;
  const date = query.get('date') || format(new Date(), 'y-MM-dd');

  useEffect(() => {
    if (userId) {
      listActivities(userId, new Date(date));
    }

    return () => {
      reset();
    };
  }, [listActivities, date, userId, user, reset]);

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb
            items={[
              new BreadcrumbItem(
                t('activity.list.title', {date: monthNormalizer(date)})
              )
            ]}
          />
          <ServerErrors errors={list.errors} />
          <Row className={'mb-3'}>
            {userId && (
              <UserFilter
                userId={userId}
                onChange={(e: any) => {
                  history.push(
                    `/activities?userId=${e.target.value}&date=${date}`
                  );
                }}
              />
            )}
          </Row>
          <Table bordered>
            <thead>
              <tr>
                <th>{t('activity.list.date')}</th>
                <th>{t('activity.list.activities')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map(
                (monthlyActivities, key: number) =>
                  monthlyActivities instanceof MonthlyActivities && (
                    <ActivityDetail
                      key={key}
                      canAddActivity={userId === user?.id}
                      monthlyActivities={monthlyActivities}
                    />
                  )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      {list.loading && (
        <Row className={'justify-content-md-center'}>
          <Col md={'auto'}>
            <Spinner animation={'border'} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default connect(
  (state: AppState) => ({
    list: state.core.list,
    user: state.auth.authentication.user
  }),
  dispatch => ({
    ...bindActionCreators({listActivities, reset}, dispatch)
  })
)(ListView);
