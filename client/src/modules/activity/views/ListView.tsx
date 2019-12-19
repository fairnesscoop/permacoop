import React, {useEffect} from 'react';
import {connect} from 'react-redux';
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

interface IProps {
  list: CoreListState<MonthlyActivities>;
  user: LoggedUser | null;
  listActivities(userId: string, date: Date): void;
  reset(): ICoreListResetAction;
}

const ListView: React.FC<IProps> = ({list, listActivities, user, reset}) => {
  const {t} = useTranslation();

  useEffect(() => {
    if (user) {
      listActivities(user.id, new Date());
    }

    return () => {
      reset();
    };
  }, [listActivities, user, reset]);

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('activity.title'))]} />
          <ServerErrors errors={list.errors} />
          <Table bordered>
            <thead>
              <tr>
                <th>{t('activity.list.date')}</th>
                <th>{t('activity.list.title')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.payload.map(
                (monthlyActivities, key: number) =>
                  monthlyActivities instanceof MonthlyActivities && (
                    <ActivityDetail
                      key={key}
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
