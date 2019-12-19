import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import Breadcrumb from '../../core/components/Breadcrumb';
import {BreadcrumbItem} from '../../core/models/BreadcrumbItem';

const ListView: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      <Row>
        <Col>
          <Breadcrumb items={[new BreadcrumbItem(t('activity.title'))]} />
          <Link to={'/activities/add'} className={'btn btn-primary mb-3'}>
            <i className={'fas fa-plus'}></i> {t('activity.add.title')}
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default ListView;
