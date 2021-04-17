import { mock, instance } from 'ts-mockito';
import { PaySlip } from './PaySlip.entity';
import { User } from '../User/User.entity';
import { File } from 'src/Domain/File/File.entity';

describe('PaySlip.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const file = mock(File);

    const paySlip = new PaySlip('2020-04-26', instance(file), instance(user));

    expect(paySlip.getId()).toBe(undefined);
    expect(paySlip.getDate()).toBe('2020-04-26');
    expect(paySlip.getUser()).toBe(instance(user));
    expect(paySlip.getFile()).toBe(instance(file));
  });
});
