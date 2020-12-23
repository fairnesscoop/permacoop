import { MealTicketRemovalDTO } from './MealTicketRemovalDTO';
import { validate } from 'class-validator';

describe('MealTicketRemovalDTO', () => {
  it('testValidDTO', async () => {
    const dto = new MealTicketRemovalDTO();
    dto.date = '2020-12-17T03:24:00';
    dto.comment = 'dejeuner offert';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new MealTicketRemovalDTO();
    dto.date = '';
    dto.comment = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'date must be a ISOString',
      isNotEmpty: 'date should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'comment should not be empty',
    });
  });
});
