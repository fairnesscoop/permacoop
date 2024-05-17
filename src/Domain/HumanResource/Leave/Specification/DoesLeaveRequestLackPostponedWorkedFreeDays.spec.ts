import { mock } from 'ts-mockito';
import { DoesLeaveRequestLackPostponedWorkedFreeDays } from './DoesLeaveRequestLackPostponedWorkedFreeDays';

describe('DoesLeaveRequestLackPostponedWorkedFreeDays', () => {
  let doesLeaveRequestLackPostponedWorkedFreeDays: DoesLeaveRequestLackPostponedWorkedFreeDays;

  beforeEach(() => {
    doesLeaveRequestLackPostponedWorkedFreeDays = new DoesLeaveRequestLackPostponedWorkedFreeDays();
  });

  it('testLeaveRequestLackPostponedWorkedFreeDays', () => {
    expect(
      doesLeaveRequestLackPostponedWorkedFreeDays.isSatisfiedBy(
        '2024-07-01',
        '2024-07-31'
      )
    ).toBe(true);
  });

  it('testLeaveRequestDoesntLackPostponedWorkedFreeDays', () => {
    expect(
      doesLeaveRequestLackPostponedWorkedFreeDays.isSatisfiedBy(
        '2024-08-01',
        '2024-08-30'
      )
    ).toBe(false);
  });
});
