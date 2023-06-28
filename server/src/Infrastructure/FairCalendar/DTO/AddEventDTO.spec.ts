import { AddEventDTO } from './AddEventDTO';
import { validate } from 'class-validator';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';

describe('AddEventDTO', () => {
  it('testValidDTO', async () => {
    const dto = new AddEventDTO();
    dto.type = EventType.MISSION;
    dto.startDate = '2019-12-19T11:20:04.568Z';
    dto.endDate = '2019-12-20T11:20:04.568Z';
    dto.time = 30;
    dto.projectId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.taskId = 'ff623892-434b-4f2d-945e-775c87bae2ac';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidPeriodDTO', async () => {
    const dto = new AddEventDTO();
    dto.type = EventType.MISSION;
    dto.startDate = '2019-12-19T11:20:04.568Z';
    dto.endDate = '2019-12-18T11:20:04.568Z';
    dto.time = 480;
    dto.projectId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.taskId = 'ff623892-434b-4f2d-945e-775c87bae2ac';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      dateGreaterOrEqualThan:
        'endDate should be greater or equal than startDate'
    });
  });

  it('testInvalidDTO', async () => {
    const dto = new AddEventDTO();
    dto.startDate = '2019-12-19';
    dto.endDate = '2019-12-20';
    dto.time = 12;
    dto.projectId = '1';
    dto.taskId = '2';

    const validation = await validate(dto);
    expect(validation).toHaveLength(6);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'startDate must be a ISOString'
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: 'endDate must be a ISOString'
    });
    expect(validation[2].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isIn:
        'time must be one of the following values: 30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480'
    });
    expect(validation[4].constraints).toMatchObject({
      isUuid: 'projectId must be an UUID'
    });
    expect(validation[5].constraints).toMatchObject({
      isUuid: 'taskId must be an UUID'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new AddEventDTO();
    dto.startDate = '';
    dto.endDate = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'startDate should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'endDate should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: 'time should not be empty'
    });
  });
});
