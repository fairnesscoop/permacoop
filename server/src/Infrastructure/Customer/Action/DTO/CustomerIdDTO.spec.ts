import {validate} from 'class-validator';
import {CustomerIdDTO} from './CustomerIdDTO';

describe('CustomerIdDTO', () => {
  it('testValidDTO', async () => {
    const dto = new CustomerIdDTO();
    dto.id = '43e11bb6-bdbb-4f47-9ae2-e1a35d76873a';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyId', async () => {
    const dto = new CustomerIdDTO();
    dto.id = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'id should not be empty'
    });
  });

  it('testInvalidId', async () => {
    const dto = new CustomerIdDTO();
    dto.id = '12';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'id must be an UUID'
    });
  });
});
