import { validate } from 'class-validator';
import { AddressDTO } from './AddressDTO';

describe('AddressDTO', () => {
  it('testValidDTO', async () => {
    const dto = new AddressDTO();
    dto.street = '2 rue Dieu';
    dto.city = 'Paris';
    dto.zipCode = '75010';
    dto.country = 'FR';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new AddressDTO();
    dto.street = '';
    dto.city = '';
    dto.zipCode = '';
    dto.country = 'France';

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'street should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'city should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'zipCode should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isISO31661Alpha2: 'country must be a valid ISO31661 Alpha2 code'
    });
  });
});
