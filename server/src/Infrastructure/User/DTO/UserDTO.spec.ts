import {UserDTO} from './UserDTO';
import {validate} from 'class-validator';

describe('UserDTO', () => {
  it('testValidDTO', async () => {
    const dto = new UserDTO();
    dto.email = 'mathieu@fairness.coop';
    dto.firstName = 'Mathieu';
    dto.lastName = 'MARCHOIS';
    dto.password = 'password';
    dto.entryDate = '2020-12-17T03:24:00';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UserDTO();
    dto.email = 'mathieufairness.coop';
    dto.firstName = '';
    dto.lastName = '';
    dto.password = '';
    dto.entryDate = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'firstName should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'lastName should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isEmail: 'email must be an email'
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: 'password should not be empty'
    });
    expect(validation[4].constraints).toMatchObject({
      isDateString: 'entryDate must be a ISOString',
      isNotEmpty: 'entryDate should not be empty'
    });
  });
});
