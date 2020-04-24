import {User} from './User.entity';

describe('User.entity', () => {
  it('testGetters', () => {
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword'
    );

    expect(user.getEmail()).toBe('mathieu@fairness.coop');
    expect(user.getFirstName()).toBe('Mathieu');
    expect(user.getLastName()).toBe('MARCHOIS');
    expect(user.getPassword()).toBe('hashPassword');
    expect(user.getApiToken()).toBe('hashToken');
  });
});
