import { UserDTO } from './UserDTO';
import { validate } from 'class-validator';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import {
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

describe('UserDTO', () => {
  it('testValidDTO', async () => {
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
    dto.leavingDate = 'invalid';

    const validation = await validate(dto);
    expect(validation).toHaveLength(12);
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
      isEnum: 'role must be a valid enum value',
      isNotEmpty: 'role should not be empty'
    });
    expect(validation[5].constraints).toMatchObject({
      isInt: 'annualEarnings must be an integer number',
      isNotEmpty: 'annualEarnings should not be empty',
      isPositive: 'annualEarnings must be a positive number'
    });
    expect(validation[6].constraints).toMatchObject({
      isBoolean: 'healthInsurance must be a boolean value',
      isNotEmpty: 'healthInsurance should not be empty'
    });
    expect(validation[7].constraints).toMatchObject({
      isBoolean: 'executivePosition must be a boolean value',
      isNotEmpty: 'executivePosition should not be empty'
    });
    expect(validation[8].constraints).toMatchObject({
      isIso8601: 'joiningDate must be a valid ISO 8601 date string',
      isNotEmpty: 'joiningDate should not be empty'
    });
    expect(validation[9].constraints).toMatchObject({
      isIso8601: 'leavingDate must be a valid ISO 8601 date string'
    });
    expect(validation[10].constraints).toMatchObject({
      isEnum: 'contract must be a valid enum value',
      isNotEmpty: 'contract should not be empty'
    });
    expect(validation[11].constraints).toMatchObject({
      isEnum: 'workingTime must be a valid enum value',
      isNotEmpty: 'workingTime should not be empty'
    });
  });
});
