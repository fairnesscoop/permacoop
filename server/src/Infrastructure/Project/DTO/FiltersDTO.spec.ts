import { FiltersDTO } from './FiltersDTO';
import { validate } from 'class-validator';

describe('FiltersDTO', () => {
  it('testValidDTO', async () => {
    let dto = new FiltersDTO();
    expect(dto.page).toBeNull();
    dto.customerId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    let validation = await validate(dto);
    expect(validation).toHaveLength(0);

    dto = new FiltersDTO();
    dto.customerId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.page = 1;
    validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new FiltersDTO();
    dto.customerId = '12';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'customerId must be an UUID'
    });
  });
});
