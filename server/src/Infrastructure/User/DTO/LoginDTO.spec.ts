import {LoginDTO} from './LoginDTO';
import {validate} from 'class-validator';

describe('LoginDTO', () => {
  it('testValidDTO', async () => {
    const dto = new LoginDTO();
    dto.email = 'mathieu@fairness.coop';
    dto.password = 'password';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new LoginDTO();
    dto.email = 'email';
    dto.password = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isEmail: 'email must be an email'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'password should not be empty'
    });
  });
});
