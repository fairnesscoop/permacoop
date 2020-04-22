import {QuoteDTO} from './QuoteDTO';
import {validate} from 'class-validator';
import {QuoteItemDTO} from './QuoteItemDTO';
import {QuoteStatus} from 'src/Domain/Accounting/Quote.entity';

const itemDto = new QuoteItemDTO();
itemDto.dailyRate = 700;
itemDto.title = 'Développement';
itemDto.quantity = 1;

describe('QuoteDTO', () => {
  it('testValidDTO', async () => {
    const dto = new QuoteDTO();
    dto.projectId = '33aa85f8-52e6-44e6-9200-31dcdc038e64';
    dto.customerId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.status = QuoteStatus.DRAFT;
    dto.items = [itemDto];

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testWithInvalidItemsDTO', async () => {
    const invalidDto = new QuoteItemDTO();
    invalidDto.dailyRate = -700;
    invalidDto.title = '';
    invalidDto.quantity = -1;

    const dto = new QuoteDTO();
    dto.projectId = '33aa85f8-52e6-44e6-9200-31dcdc038e64';
    dto.customerId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.status = QuoteStatus.DRAFT;
    dto.items = [invalidDto];

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
  });

  it('testEmptyProjectDTO', async () => {
    const dto = new QuoteDTO();
    dto.customerId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.status = QuoteStatus.DRAFT;
    dto.items = [itemDto];

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new QuoteDTO();
    dto.projectId = '1';
    dto.customerId = '12';

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'projectId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isUuid: 'customerId must be an UUID'
    });
    expect(validation[2].constraints).toMatchObject({
      isEnum: 'status must be a valid enum value',
      isNotEmpty: 'status should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isArray: 'items must be an array'
    });
  });
});
