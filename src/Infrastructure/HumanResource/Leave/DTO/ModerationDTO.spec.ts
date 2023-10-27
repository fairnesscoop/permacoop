import { ModerationAction, ModerationDTO } from './ModerationDTO';
import { validate } from 'class-validator';

describe('ModerationDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ModerationDTO();
    dto.comment = 'Bad period';
    dto.action = ModerationAction.ACCEPT;
    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto2 = new ModerationDTO();
    const validation = await validate(dto2);

    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'action must be a valid enum value',
      isNotEmpty: 'action should not be empty'
    });
  });
});
