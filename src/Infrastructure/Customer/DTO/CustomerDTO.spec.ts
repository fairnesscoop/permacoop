import { CustomerDTO } from './CustomerDTO';
import { validate } from 'class-validator';

describe('CustomerDTO', () => {
  it('testValidDTO', async () => {
    const dto = new CustomerDTO();
    dto.name = 'Customer';
    dto.street = '2 rue Dieu';
    dto.city = 'Paris';
    dto.zipCode = '75010';
    dto.country = 'FR';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new CustomerDTO();
    dto.name = '';
    dto.street = '';
    dto.city = '';
    dto.zipCode = '';
    dto.country = 'France';

    const validation = await validate(dto);
    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'street should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'city should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: 'zipCode should not be empty'
    });
    expect(validation[4].constraints).toMatchObject({
      isISO31661Alpha2: 'country must be a valid ISO31661 Alpha2 code'
    });
  });
});
