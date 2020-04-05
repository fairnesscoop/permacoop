import {validate} from 'class-validator';
import {CreateQuoteItemDTO} from './CreateQuoteItemDTO';

describe('CreateQuoteItemDTO', () => {
  it('testValidDTO', async () => {
    const dto = new CreateQuoteItemDTO();
    dto.vat = 20;
    dto.dailyRate = 700;
    dto.title = 'Développement';
    dto.quantity = 1;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new CreateQuoteItemDTO();
    dto.vat = 0.2;
    dto.dailyRate = -700;
    dto.title = '';
    dto.quantity = -1;

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);
    expect(validation[0].constraints).toMatchObject({
      isPositive: 'quantity must be a positive number'
    });
    expect(validation[1].constraints).toMatchObject({
      isPositive: 'dailyRate must be a positive number'
    });
    expect(validation[2].constraints).toMatchObject({
      isInt: 'vat must be an integer number'
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: 'title should not be empty'
    });
  });
});
