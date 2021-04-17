import { mock, instance, when, verify } from 'ts-mockito';
import { PaySlip } from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import { IsPaySlipAlreadyExist } from './IsPaySlipAlreadyExist';
import { PaySlipRepository } from 'src/Infrastructure/HumanResource/PaySlip/Repository/PaySlipRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { File } from 'src/Domain/File/File.entity';

describe('IsPaySlipAlreadyExist', () => {
  let paySlipRepository: PaySlipRepository;
  let isPaySlipAlreadyExist: IsPaySlipAlreadyExist;
  const user = mock(User);
  const file = mock(File);
  const date = new Date('2020-04-29');

  beforeEach(() => {
    paySlipRepository = mock(PaySlipRepository);
    isPaySlipAlreadyExist = new IsPaySlipAlreadyExist(
      instance(paySlipRepository)
    );
  });

  it('testPaySlipAlreadyExist', async () => {
    when(
      paySlipRepository.findOneByUserAndDate(instance(user), date)
    ).thenResolve(new PaySlip('2020-04-29', instance(file), instance(user)));
    expect(
      await isPaySlipAlreadyExist.isSatisfiedBy(instance(user), date)
    ).toBe(true);
    verify(paySlipRepository.findOneByUserAndDate(instance(user), date)).once();
  });

  it('testPaySlipDoesntExist', async () => {
    when(
      paySlipRepository.findOneByUserAndDate(instance(user), date)
    ).thenResolve(null);
    expect(
      await isPaySlipAlreadyExist.isSatisfiedBy(instance(user), date)
    ).toBe(false);
    verify(paySlipRepository.findOneByUserAndDate(instance(user), date)).once();
  });
});
