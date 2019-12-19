import {TaskDTO} from './TaskDTO';
import {validate} from 'class-validator';

describe('TaskDTO', () => {
  it('testValidDTO', async () => {
    const dto = new TaskDTO();
    dto.name = 'Task';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new TaskDTO();
    dto.name = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
  });
});
