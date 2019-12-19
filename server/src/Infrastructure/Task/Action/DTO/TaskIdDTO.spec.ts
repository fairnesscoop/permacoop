import {validate} from 'class-validator';
import {TaskIdDTO} from './TaskIdDTO';

describe('TaskIdDTO', () => {
  it('testValidDTO', async () => {
    const dto = new TaskIdDTO();
    dto.id = '43e11bb6-bdbb-4f47-9ae2-e1a35d76873a';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidId', async () => {
    const dto = new TaskIdDTO();
    dto.id = '21';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'id must be an UUID'
    });
  });
});
