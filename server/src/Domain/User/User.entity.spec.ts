import {User, UserRole} from './User.entity';

describe('User.entity', () => {
  it('testGetters', () => {
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword',
      UserRole.COOPERATOR,
      '2019-09-12'
    );

    expect(user.getEmail()).toBe('mathieu@fairness.coop');
    expect(user.getFirstName()).toBe('Mathieu');
    expect(user.getLastName()).toBe('MARCHOIS');
    expect(user.getPassword()).toBe('hashPassword');
    expect(user.getApiToken()).toBe('hashToken');
    expect(user.getEntryDate()).toBe('2019-09-12');
    expect(user.getRole()).toBe(UserRole.COOPERATOR);
  });

  it('testUpdate', () => {
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword',
      UserRole.COOPERATOR,
      '2019-09-12'
    );
    user.update('firstName', 'lastName', 'email@email.com');
    user.updatePassword('password');

    expect(user.getEmail()).toBe('email@email.com');
    expect(user.getFirstName()).toBe('firstName');
    expect(user.getLastName()).toBe('lastName');
    expect(user.getPassword()).toBe('password');
    expect(user.getApiToken()).toBe('hashToken');
    expect(user.getEntryDate()).toBe('2019-09-12');
    expect(user.getRole()).toBe(UserRole.COOPERATOR);
  });
});
