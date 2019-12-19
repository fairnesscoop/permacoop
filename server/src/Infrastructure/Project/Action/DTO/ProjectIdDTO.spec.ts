import {validate} from 'class-validator';
import {ProjectIdDTO} from './ProjectIdDTO';

describe('ProjectIdDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ProjectIdDTO();
    dto.id = '43e11bb6-bdbb-4f47-9ae2-e1a35d76873a';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidId', async () => {
    const dto = new ProjectIdDTO();
    dto.id = '12';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'id must be an UUID'
    });
  });
});
