import { InvoiceDTO } from './InvoiceDTO';
import { validate } from 'class-validator';

describe('InvoiceDTO', () => {
  it('testValidDTO', async () => {
    const dto = new InvoiceDTO();
    dto.projectId = '33aa85f8-52e6-44e6-9200-31dcdc038e64';
    dto.expireInDays = 30;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new InvoiceDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'projectId should not be empty',
      isUuid: 'projectId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'expireInDays should not be empty',
      isPositive: 'expireInDays must be a positive number'
    });
  });
});
