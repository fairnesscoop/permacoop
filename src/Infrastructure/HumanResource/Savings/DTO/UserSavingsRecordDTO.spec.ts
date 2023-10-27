import { UserSavingsRecordDTO } from './UserSavingsRecordDTO';
import { validate } from 'class-validator';

describe('UserSavingsRecordDTO', () => {
  it('testValidDTO', async () => {
    const dto = new UserSavingsRecordDTO();
    dto.amount = -5000;
    dto.userId = 'e0884737-2a01-4f12-ac0e-c4d0ccc48d59';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UserSavingsRecordDTO();
    const validation = await validate(dto);

    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'userId should not be empty',
      isUuid: 'userId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'amount should not be empty',
      isNumber:
        'amount must be a number conforming to the specified constraints'
    });
  });
});
