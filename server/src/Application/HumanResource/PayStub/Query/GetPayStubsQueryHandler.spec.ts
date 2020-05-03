import {mock, instance, when, verify} from 'ts-mockito';
import {PayStub} from 'src/Domain/HumanResource/PayStub/PayStub.entity';
import {PayStubRepository} from 'src/Infrastructure/HumanResource/PayStub/Repository/PayStubRepository';
import {GetPayStubsQueryHandler} from './GetPayStubsQueryHandler';
import {GetPayStubsQuery} from './GetPayStubsQuery';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {File} from 'src/Domain/File/File.entity';
import {PayStubView} from '../View/PayStubView';
import {FileView} from 'src/Application/File/View/FileView';
import {UserSummaryView} from '../../User/View/UserSummaryView';

describe('GetPayStubsQueryHandler', () => {
  it('testGetPayStubs', async () => {
    const payStubRepository = mock(PayStubRepository);

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

    const payStub1 = mock(PayStub);
    when(payStub1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(payStub1.getDate()).thenReturn('2020-05-03');
    when(payStub1.getUser()).thenReturn(instance(user));
    when(payStub1.getFile()).thenReturn(instance(file1));

    const payStub2 = mock(PayStub);
    when(payStub2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(payStub2.getDate()).thenReturn('2020-04-02');
    when(payStub2.getUser()).thenReturn(instance(user));
    when(payStub2.getFile()).thenReturn(instance(file2));

    when(payStubRepository.findAll()).thenResolve([
      instance(payStub1),
      instance(payStub2)
    ]);

    const queryHandler = new GetPayStubsQueryHandler(
      instance(payStubRepository)
    );

    const expectedResult = [
      new PayStubView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        '2020-05-03',
        new UserSummaryView(
          'c453e506-dd9f-500f-927e-dcc54cc035d6',
          'Mathieu',
          'MARCHOIS'
        ),
        new FileView('f4646506-dd8f-490f-927e-d5c54cc035d6', 'file1.pdf', 200)
      ),
      new PayStubView(
        'd54f15d6-1a1d-47e8-8672-9f46018f9960',
        '2020-04-02',
        new UserSummaryView(
          'c453e506-dd9f-500f-927e-dcc54cc035d6',
          'Mathieu',
          'MARCHOIS'
        ),
        new FileView('62bebec4-e34c-43d5-a6c8-7715dd95d662', 'file2.pdf', 220)
      )
    ];

    expect(await queryHandler.execute(new GetPayStubsQuery())).toMatchObject(
      expectedResult
    );

    verify(payStubRepository.findAll()).once();
  });

  it('testGetEmptyPayStubs', async () => {
    const payStubRepository = mock(PayStubRepository);
    when(payStubRepository.findAll()).thenResolve([]);

    const queryHandler = new GetPayStubsQueryHandler(
      instance(payStubRepository)
    );

    expect(await queryHandler.execute(new GetPayStubsQuery())).toMatchObject(
      []
    );

    verify(payStubRepository.findAll()).once();
  });
});
