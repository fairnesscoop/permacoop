import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AppState} from '../../../store/reducers';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';
import {reset} from '../../core/actions/upsert';
import ServerErrors from '../../core/components/ServerErrors';
import {CoreUpsertState, ICoreUpsertResetAction} from '../../core/types/upsert';
import {upsertActivity} from '../middlewares/upsert';
import ActivityForm, {ActivityFormData} from '../components/form/ActivityForm';
import {dateNormalizer} from '../../../normalizer/date';

interface RouteParams {
  date: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  upsert: CoreUpsertState;
  reset(): ICoreUpsertResetAction;
  upsertActivity(date: string, payload: ActivityFormData): void;
}

const AddView: React.FC<IProps> = ({
  upsertActivity,
  reset,
  upsert,
  match: {params: date}
}) => {
  const {t} = useTranslation();

  const handleSubmit = (payload: ActivityFormData) => {
    upsertActivity(date.date, payload);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (upsert.payload) {
    return <Redirect to={`/activities?date=${date.date}`} />;
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb
            items={[
              new BreadcrumbItem(t('activity.title'), '/activities', false),
              new BreadcrumbItem(
                t('activity.add.title', {date: dateNormalizer(date.date)})
              )
            ]}
          />
          <ServerErrors errors={upsert.errors} />
        </Col>
      </Row>
      <ActivityForm loading={upsert.loading} onSubmit={handleSubmit} />
    </>
  );
};

export default connect(
  (state: AppState) => ({
    upsert: state.core.upsert
  }),
  dispatch => ({
    ...bindActionCreators({reset, upsertActivity}, dispatch)
  })
)(AddView);
