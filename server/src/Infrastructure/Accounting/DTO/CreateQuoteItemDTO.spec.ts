import {validate} from 'class-validator';
import {CreateQuoteItemDTO} from './CreateQuoteItemDTO';

describe('CreateQuoteItemDTO', () => {
  it('testValidDTO', async () => {
    const dto = new CreateQuoteItemDTO();
    dto.dailyRate = 700;
    dto.title = 'Développement';
    dto.quantity = 1;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new CreateQuoteItemDTO();
    dto.dailyRate = 0;
    dto.title = '';
    dto.quantity = 0.5;

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isInt: 'quantity must be an integer number'
    });
    expect(validation[1].constraints).toMatchObject({
      isPositive: 'dailyRate must be a positive number'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'title should not be empty'
    });
  });
});
