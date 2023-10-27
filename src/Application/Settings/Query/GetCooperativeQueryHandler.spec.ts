import { mock, instance, when, verify } from 'ts-mockito';
import { CooperativeRepository } from 'src/Infrastructure/Settings/Repository/CooperativeRepository';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { GetCooperativeQueryHandler } from './GetCooperativeQueryHandler';
import { CooperativeView } from '../View/CooperativeView';
import { GetCooperativeQuery } from './GetCooperativeQuery';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';

describe('GetCooperativeQueryHandlerHandler', () => {
  it('testCooperativeNotFound', async () => {
    const cooperativeRepository = mock(CooperativeRepository);

    when(cooperativeRepository.find()).thenResolve(null);

    const queryHandler = new GetCooperativeQueryHandler(
      instance(cooperativeRepository)
    );

    try {
      await queryHandler.execute(new GetCooperativeQuery());
    } catch (e) {
      expect(e).toBeInstanceOf(CooperativeNotFoundException);
      expect(e.message).toBe('settings.errors.cooperative_not_found');
      verify(cooperativeRepository.find()).once();
    }
  });

  it('testGetCooperative', async () => {
    const cooperativeRepository = mock(CooperativeRepository);
    const cooperative = mock(Cooperative);

    when(cooperative.getDayDuration()).thenReturn(420);
    when(cooperativeRepository.find()).thenResolve(instance(cooperative));

    const queryHandler = new GetCooperativeQueryHandler(
      instance(cooperativeRepository)
    );

    expect(await queryHandler.execute(new GetCooperativeQuery())).toMatchObject(
      new CooperativeView(420)
    );
    verify(cooperativeRepository.find()).once();
  });
});
