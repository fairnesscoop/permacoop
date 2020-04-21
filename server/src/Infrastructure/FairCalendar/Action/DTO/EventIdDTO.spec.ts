import {EventIdDTO} from './EventIdDTO';
import {validate} from 'class-validator';

describe('EventIdDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EventIdDTO();
    dto.id = 'ff623892-434b-4f2d-945e-775c87bae2ac';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new EventIdDTO();
    dto.id = '25';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'id must be an UUID'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new EventIdDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'id should not be empty'
    });
  });
});
