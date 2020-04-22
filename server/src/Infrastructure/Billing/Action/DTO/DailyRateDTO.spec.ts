import {validate} from 'class-validator';
import {DailyRateDTO} from './DailyRateDTO';

describe('DailyRateDTO', () => {
  it('testValidDTO', async () => {
    const dto = new DailyRateDTO();
    dto.amount = 650.5;
    dto.userId = '23412ddf-16e9-47a2-ab6a-963d0602f710';
    dto.taskId = '25cd48cc-6638-4141-9e6c-3a9e36c40cd0';
    dto.customerId = '92ddfd3d-7814-4fe5-9410-e5797f7d3c1e';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new DailyRateDTO();
    dto.amount = 0;
    dto.userId = '123';
    dto.taskId = '456';
    dto.customerId = '789';

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);

    expect(validation[0].constraints).toMatchObject({
      isUuid: 'userId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isUuid: 'customerId must be an UUID'
    });
    expect(validation[2].constraints).toMatchObject({
      isUuid: 'taskId must be an UUID'
    });
    expect(validation[3].constraints).toMatchObject({
      isPositive: 'amount must be a positive number'
    });
  });
});
