import {mock, instance, when, verify} from 'ts-mockito';
import {PaySlip} from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import {PaySlipRepository} from 'src/Infrastructure/HumanResource/PaySlip/Repository/PaySlipRepository';
import {GetPaySlipsQueryHandler} from './GetPaySlipsQueryHandler';
import {GetPaySlipsQuery} from './GetPaySlipsQuery';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {File} from 'src/Domain/File/File.entity';
import {PaySlipView} from '../View/PaySlipView';
import {FileView} from 'src/Application/File/View/FileView';
import {UserSummaryView} from '../../User/View/UserSummaryView';
import {Pagination} from 'src/Application/Common/Pagination';

describe('GetPaySlipsQueryHandler', () => {
  it('testGetPaySlips', async () => {
    const paySlipRepository = mock(PaySlipRepository);

    const user = mock(User);
    when(user.getId()).thenReturn('c453e506-dd9f-500f-927e-dcc54cc035d6');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');

    const file1 = mock(File);
    when(file1.getId()).thenReturn('f4646506-dd8f-490f-927e-d5c54cc035d6');
    when(file1.getSize()).thenReturn(200);
    when(file1.getName()).thenReturn('xbn_file1.pdf');
    when(file1.getOriginalName()).thenReturn('file1.pdf');

    const file2 = mock(File);
    when(file2.getId()).thenReturn('62bebec4-e34c-43d5-a6c8-7715dd95d662');
    when(file2.getSize()).thenReturn(220);
    when(file2.getName()).thenReturn('ccc_file2.pdf');
    when(file2.getOriginalName()).thenReturn('file2.pdf');

    const paySlip1 = mock(PaySlip);
    when(paySlip1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(paySlip1.getDate()).thenReturn('2020-05-03');
    when(paySlip1.getUser()).thenReturn(instance(user));
    when(paySlip1.getFile()).thenReturn(instance(file1));

    const paySlip2 = mock(PaySlip);
    when(paySlip2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(paySlip2.getDate()).thenReturn('2020-04-02');
    when(paySlip2.getUser()).thenReturn(instance(user));
    when(paySlip2.getFile()).thenReturn(instance(file2));

    when(paySlipRepository.findPaySlips(1)).thenResolve([
      [instance(paySlip1), instance(paySlip2)],
      2
    ]);

    const queryHandler = new GetPaySlipsQueryHandler(
      instance(paySlipRepository)
    );

    const expectedResult = new Pagination<PaySlipView>(
      [
        new PaySlipView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          '2020-05-03',
          new UserSummaryView(
            'c453e506-dd9f-500f-927e-dcc54cc035d6',
            'Mathieu',
            'MARCHOIS'
          ),
          new FileView('f4646506-dd8f-490f-927e-d5c54cc035d6', 'file1.pdf', 200)
        ),
        new PaySlipView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          '2020-04-02',
          new UserSummaryView(
            'c453e506-dd9f-500f-927e-dcc54cc035d6',
            'Mathieu',
            'MARCHOIS'
          ),
          new FileView('62bebec4-e34c-43d5-a6c8-7715dd95d662', 'file2.pdf', 220)
        )
      ],
      2
    );

    expect(await queryHandler.execute(new GetPaySlipsQuery(1))).toMatchObject(
      expectedResult
    );

    verify(paySlipRepository.findPaySlips(1)).once();
  });
});
