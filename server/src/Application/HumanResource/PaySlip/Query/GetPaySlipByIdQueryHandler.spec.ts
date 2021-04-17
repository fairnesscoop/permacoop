import { mock, instance, when, verify } from 'ts-mockito';
import { GetPaySlipByIdQueryHandler } from './GetPaySlipByIdQueryHandler';
import { GetPaySlipByIdQuery } from './GetPaySlipByIdQuery';
import { PaySlipView } from '../View/PaySlipView';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { FileView } from 'src/Application/File/View/FileView';
import { PaySlipRepository } from 'src/Infrastructure/HumanResource/PaySlip/Repository/PaySlipRepository';
import { File } from 'src/Domain/File/File.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { PaySlip } from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import { PaySlipNotFoundException } from 'src/Domain/HumanResource/PaySlip/Exception/PaySlipNotFoundException';

describe('GetPaySlipByIdQueryHandler', () => {
  const query = new GetPaySlipByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetPaySlip', async () => {
    const payslipRepository = mock(PaySlipRepository);
    const queryHandler = new GetPaySlipByIdQueryHandler(
      instance(payslipRepository)
    );
    const expectedResult = new PaySlipView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      '2020-05-03',
      new UserSummaryView(
        'c453e506-dd9f-500f-927e-dcc54cc035d6',
        'Mathieu',
        'MARCHOIS'
      ),
      new FileView('f4646506-dd8f-490f-927e-d5c54cc035d6', 'file1.pdf', 200)
    );
    const user = mock(User);
    when(user.getId()).thenReturn('c453e506-dd9f-500f-927e-dcc54cc035d6');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');

    const file1 = mock(File);
    when(file1.getId()).thenReturn('f4646506-dd8f-490f-927e-d5c54cc035d6');
    when(file1.getSize()).thenReturn(200);
    when(file1.getName()).thenReturn('xbn_file1.pdf');
    when(file1.getOriginalName()).thenReturn('file1.pdf');

    const paySlip1 = mock(PaySlip);
    when(paySlip1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(paySlip1.getDate()).thenReturn('2020-05-03');
    when(paySlip1.getUser()).thenReturn(instance(user));
    when(paySlip1.getFile()).thenReturn(instance(file1));

    when(
      payslipRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(paySlip1));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      payslipRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetPaySlipNotFound', async () => {
    const payslipRepository = mock(PaySlipRepository);
    const queryHandler = new GetPaySlipByIdQueryHandler(
      instance(payslipRepository)
    );
    when(
      payslipRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(PaySlipNotFoundException);
      expect(e.message).toBe('human_resources.pay_slips.errors.not_found');
      verify(
        payslipRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
