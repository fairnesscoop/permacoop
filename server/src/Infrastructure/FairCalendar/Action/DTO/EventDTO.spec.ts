import {EventDTO} from './EventDTO';
import {validate} from 'class-validator';
import {EventType} from 'src/Domain/FairCalendar/Event.entity';

describe('EventDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EventDTO();
    dto.type = EventType.MISSION;
    dto.date = '2019-12-19T11:20:04.568Z';
    dto.time = '25';
    dto.projectId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.taskId = 'ff623892-434b-4f2d-945e-775c87bae2ac';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new EventDTO();
    dto.date = '2019-12-19';
    dto.time = '30';
    dto.projectId = '1';
    dto.taskId = '2';

    const validation = await validate(dto);
    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: 'date must be a ISOString'
    });
    expect(validation[2].constraints).toMatchObject({
      isIn: 'time must be one of the following values: 25,50,75,100'
    });
    expect(validation[3].constraints).toMatchObject({
      isUuid: 'projectId must be an UUID'
    });
    expect(validation[4].constraints).toMatchObject({
      isUuid: 'taskId must be an UUID'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new EventDTO();
    dto.date = '';
    dto.time = '';

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'date should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'time should not be empty'
    });
  });
});
