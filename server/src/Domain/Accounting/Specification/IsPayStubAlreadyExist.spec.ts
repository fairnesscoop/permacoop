import {mock, instance, when, verify, anything, anyOfClass} from 'ts-mockito';
import {PayStub} from 'src/Domain/Accounting/PayStub.entity';
import {IsPayStubAlreadyExist} from './IsPayStubAlreadyExist';
import {PayStubRepository} from 'src/Infrastructure/Accounting/Repository/PayStubRepository';
import {User} from 'src/Domain/User/User.entity';
import {File} from 'src/Domain/File/File.entity';

describe('IsPayStubAlreadyExist', () => {
  let payStubRepository: PayStubRepository;
  let isPayStubAlreadyExist: IsPayStubAlreadyExist;
  const user = mock(User);
  const file = mock(File);
  const date = new Date('2020-04-29');

  beforeEach(() => {
    payStubRepository = mock(PayStubRepository);
    isPayStubAlreadyExist = new IsPayStubAlreadyExist(
      instance(payStubRepository)
    );
  });

  it('testPayStubAlreadyExist', async () => {
    when(
      payStubRepository.findOneByUserAndDate(instance(user), date)
    ).thenResolve(new PayStub('2020-04-29', instance(file), instance(user)));
    expect(
      await isPayStubAlreadyExist.isSatisfiedBy(instance(user), date)
    ).toBe(true);
    verify(payStubRepository.findOneByUserAndDate(instance(user), date)).once();
  });

  it('testPayStubDoesntExist', async () => {
    when(
      payStubRepository.findOneByUserAndDate(instance(user), date)
    ).thenResolve(null);
    expect(
      await isPayStubAlreadyExist.isSatisfiedBy(instance(user), date)
    ).toBe(false);
    verify(payStubRepository.findOneByUserAndDate(instance(user), date)).once();
  });
});
