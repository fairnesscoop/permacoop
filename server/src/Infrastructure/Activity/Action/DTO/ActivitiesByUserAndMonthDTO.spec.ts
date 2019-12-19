import {validate} from 'class-validator';
import {ActivitiesByUserAndMonthDTO} from './ActivitiesByUserAndMonthDTO';

describe('ActivitiesByUserAndMonthDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ActivitiesByUserAndMonthDTO();
    dto.date = '2019-12-19T11:20:04.568Z';
    dto.userId = '2218609f-293b-4438-b3a0-cce8961e8acc';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new ActivitiesByUserAndMonthDTO();
    dto.date = '2019-12-19';
    dto.userId = '1';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'userId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: 'date must be a ISOString'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new ActivitiesByUserAndMonthDTO();
    dto.date = '';
    dto.userId = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'userId should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'date should not be empty'
    });
  });
});
