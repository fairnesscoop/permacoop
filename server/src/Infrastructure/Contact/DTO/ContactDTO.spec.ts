import { ContactDTO } from './ContactDTO';
import { validate } from 'class-validator';

describe('ContactDTO', () => {
  it('testValidDTO', async () => {
    const contactDTO = new ContactDTO();
    contactDTO.firstName = 'John';
    contactDTO.lastName = 'Doe';
    contactDTO.company = 'Acme';
    contactDTO.email = 'john@doe.com';
    contactDTO.phoneNumber = '+33611223344';
    contactDTO.notes = 'Lorem ipsum dolor sit amet';

    const validation = await validate(contactDTO);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new ContactDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'address should not be empty'
    });
  });
});
