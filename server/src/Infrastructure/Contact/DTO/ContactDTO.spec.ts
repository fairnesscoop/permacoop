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

  it('testValidDTOEmailOrPhoneNumberEmpty', async () => {
    const contactDTO = new ContactDTO();
    contactDTO.firstName = 'John';
    contactDTO.email = '';
    contactDTO.phoneNumber = '';

    const validation = await validate(contactDTO);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const contactDTO = new ContactDTO();
    contactDTO.email = 'obviously not a valid email';
    contactDTO.phoneNumber = 'obviously not a valid phone number';

    const validation = await validate(contactDTO);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isEmailOrEmpty: 'email must be an email'
    });
    expect(validation[1].constraints).toMatchObject({
      isPhoneNumberOrEmpty: 'phoneNumber must be a valid phone number'
    });
  });
});
