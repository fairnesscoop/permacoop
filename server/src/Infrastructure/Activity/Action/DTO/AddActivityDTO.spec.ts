import {AddActivityDTO} from './AddActivityDTO';
import {validate} from 'class-validator';

describe('AddActivityDTO', () => {
  it('testValidDTO', async () => {
    const dto = new AddActivityDTO();
    dto.date = '2019-12-19T11:20:04.568Z';
    dto.time = '25';
    dto.projectId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.taskId = 'ff623892-434b-4f2d-945e-775c87bae2ac';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new AddActivityDTO();
    dto.date = '2019-12-19';
    dto.time = '30';
    dto.projectId = '1';
    dto.taskId = '2';

    const validation = await validate(dto);
    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'date must be a ISOString'
    });
    expect(validation[1].constraints).toMatchObject({
      isIn: 'time must be one of the following values: 25,50,75,100'
    });
    expect(validation[2].constraints).toMatchObject({
      isUuid: 'projectId must be an UUID'
    });
    expect(validation[3].constraints).toMatchObject({
      isUuid: 'taskId must be an UUID'
    });
    expect(validation[4].constraints).toMatchObject({
      isString: 'summary must be a string'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new AddActivityDTO();
    dto.date = '';
    dto.time = '';
    dto.projectId = '';
    dto.taskId = '';
    dto.summary = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'date should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'time should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'projectId should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: 'taskId should not be empty'
    });
  });
});
