import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Col} from 'react-bootstrap';
import {IUser} from '../../models/IUser';
import {findUsers} from '../../repositories/user';

interface IProps {
  onChange: any;
  userId: string;
}

export const UserFilter: React.FC<IProps> = ({onChange, userId}) => {
  const {t} = useTranslation();
  const [users, setUsers] = useState<IUser[]>([]);
  const fetchUsers = async () => {
    setUsers(await findUsers());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Col>
      <label className={'form-label'}>{t('user.filter.title')} :</label>
      {users.length > 0 && (
        <select
          defaultValue={userId}
          className={'form-control'}
          onChange={onChange}
        >
          {users.map((user: IUser) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      )}
    </Col>
  );
};
