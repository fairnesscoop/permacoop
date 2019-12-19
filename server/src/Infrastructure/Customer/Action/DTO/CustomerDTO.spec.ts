import {CustomerDTO} from './CustomerDTO';
import {validate} from 'class-validator';

describe('CustomerDTO', () => {
  it('testValidDTO', async () => {
    const dto = new CustomerDTO();
    dto.name = 'Customer';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new CustomerDTO();
    dto.name = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
  });
});
