import { MealTicketRemovalDTO } from './MealTicketRemovalDTO';
import { validate } from 'class-validator';

describe('MealTicketRemovalDTO', () => {
  it('testValidDTO', async () => {
    const dto = new MealTicketRemovalDTO();
    dto.date = '2020-12-17T03:24:00';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new MealTicketRemovalDTO();
    dto.date = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isIso8601: 'date must be a valid ISO 8601 date string',
      isNotEmpty: 'date should not be empty'
    });
  });
});
