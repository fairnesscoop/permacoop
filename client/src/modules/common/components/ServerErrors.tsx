import React, {useState} from 'react';
import {Error} from '../models/Error';
import {Alert} from 'react-bootstrap';

interface IProps {
  errors: Error[];
}

const ServerErrors: React.FC<IProps> = ({errors}) => {
  const [show, setShow] = useState(true);

  if (!show || 0 === errors.length) {
    return null;
  }

  return (
    <>
      <Alert variant={'danger'} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oups, une erreur est survenue !</Alert.Heading>

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
