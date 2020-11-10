import { ModerationDTO } from './ModerationDTO';
import { validate } from 'class-validator';

describe('ModerationDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ModerationDTO();
    dto.comment = 'Bad period';
    const validation = await validate(dto);
    expect(validation).toHaveLength(0);

    const dto2 = new ModerationDTO();
    const validation2 = await validate(dto2);
    expect(validation2).toHaveLength(0);
  });
});
