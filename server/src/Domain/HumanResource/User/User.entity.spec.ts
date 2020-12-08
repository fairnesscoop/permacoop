import {mock, instance} from 'ts-mockito';
import {User, UserRole} from './User.entity';
import {UserAdministrative} from './UserAdministrative.entity';

describe('User.entity', () => {
  it('testGetters', () => {
    const admin = mock(UserAdministrative);
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword',
      UserRole.COOPERATOR,
      instance(admin)
    );

    expect(user.getId()).toBe(undefined);
    expect(user.getEmail()).toBe('mathieu@fairness.coop');
    expect(user.getFirstName()).toBe('Mathieu');
    expect(user.getLastName()).toBe('MARCHOIS');
    expect(user.getFullName()).toBe('Mathieu MARCHOIS');
    expect(user.getPassword()).toBe('hashPassword');
    expect(user.getApiToken()).toBe('hashToken');
    expect(user.getRole()).toBe(UserRole.COOPERATOR);
    expect(user.getUserAdministrative()).toBe(instance(admin));
  });

  it('testUpdate', () => {
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword',
      UserRole.COOPERATOR
    );
    user.update('firstName', 'lastName', 'email@email.com');
    user.updatePassword('password');
    user.updateRole(UserRole.ACCOUNTANT);

    expect(user.getId()).toBe(undefined);
    expect(user.getEmail()).toBe('email@email.com');
    expect(user.getFirstName()).toBe('firstName');
    expect(user.getLastName()).toBe('lastName');
    expect(user.getPassword()).toBe('password');
    expect(user.getApiToken()).toBe('hashToken');
    expect(user.getRole()).toBe(UserRole.ACCOUNTANT);
  });
});
