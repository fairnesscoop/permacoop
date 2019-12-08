import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Error} from '../models/Error';

interface IProps {
  errors: Error[];
}

const ServerErrors: React.FC<IProps> = ({errors}) => {
  const [show, setShow] = useState(true);
  const {t} = useTranslation();

  if (!show || 0 === errors.length) {
    return null;
  }

  return (
    <>
      <Alert variant={'danger'} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{t('server.errors')}</Alert.Heading>

        <ul>
          {errors.map((error, key) => (
            <li key={key}>{error.message}</li>
          ))}
        </ul>
      </Alert>
    </>
  );
};

export default ServerErrors;
