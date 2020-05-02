import {mock, instance} from 'ts-mockito';
import {PayStub} from './PayStub.entity';
import {User} from '../User/User.entity';
import {File} from 'src/Domain/File/File.entity';

describe('PayStub.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const file = mock(File);

    const payStub = new PayStub('2020-04-26', instance(file), instance(user));

    expect(payStub.getId()).toBe(undefined);
    expect(payStub.getDate()).toBe('2020-04-26');
    expect(payStub.getUser()).toBe(instance(user));
    expect(payStub.getFile()).toBe(instance(file));
  });
});
