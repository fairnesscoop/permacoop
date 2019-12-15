import React from 'react';
import {Row, Col, Jumbotron} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

export default () => {
  const {t} = useTranslation();

  return (
    <>
      <Row>
        <Col>
          <h2>{t('dashboard.title')}</h2>
        </Col>
      </Row>
    </>
  );
};
