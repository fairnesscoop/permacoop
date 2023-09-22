import { UserDTO } from './UserDTO';
import { validate } from 'class-validator';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import {
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

describe('UserDTO', () => {
  it('testValidWithoutAdministrativeDTO', async () => {
    const dto = new UserDTO();
    dto.email = 'mathieu@fairness.coop';
    dto.firstName = 'Mathieu';
    dto.lastName = 'MARCHOIS';
    dto.password = 'password';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testValidWithAdministrativeDTO', async () => {
    const dto = new UserDTO();
    dto.email = 'mathieu@fairness.coop';
    dto.firstName = 'Mathieu';
    dto.lastName = 'MARCHOIS';
    dto.password = 'password';
    dto.role = UserRole.COOPERATOR;
    dto.annualEarnings = 50000;
    dto.contract = ContractType.CDI;
    dto.workingTime = WorkingTimeType.FULL_TIME;
    dto.executivePosition = true;
    dto.healthInsurance = true;
    dto.transportFee = 7500;
    dto.joiningDate = '2020-12-17T03:24:00';
    dto.leavingDate = '2021-12-17T03:24:00';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UserDTO();
    dto.email = 'mathieufairness.coop';
    dto.firstName = '';
    dto.lastName = '';
    dto.password = '';
    dto.transportFee = 1.5;
    dto.joiningDate = '';
    dto.leavingDate = '';

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
    expect(validation[4].children[0].constraints).toMatchObject({
      isEnum: 'role must be a valid enum value',
      isNotEmpty: 'role should not be empty'
    });
  });
});
