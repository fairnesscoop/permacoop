import {CustomerDTO} from './CustomerDTO';
import {validate} from 'class-validator';
import {AddressDTO} from './AddressDTO';

describe('CustomerDTO', () => {
  it('testValidDTO', async () => {
    const addressDto = new AddressDTO();
    addressDto.street = '2 rue Dieu';
    addressDto.city = 'Paris';
    addressDto.zipCode = '75010';
    addressDto.country = 'FR';

    const dto = new CustomerDTO();
    dto.name = 'Customer';
    dto.address = addressDto;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new CustomerDTO();
    dto.name = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'address should not be empty'
    });
  });

  it('testInvalidAddressDTO', async () => {
    const badAddress = new AddressDTO();
    badAddress.country = 'France';
    const dto = new CustomerDTO();

    dto.name = 'Customer';
    dto.address = badAddress;

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
  });
});
