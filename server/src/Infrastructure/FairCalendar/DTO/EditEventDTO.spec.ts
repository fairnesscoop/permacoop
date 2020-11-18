import {EditEventDTO} from './EditEventDTO';
import {validate} from 'class-validator';
import {EventType} from 'src/Domain/FairCalendar/Event.entity';

describe('EditEventDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EditEventDTO();
    dto.type = EventType.MISSION;
    dto.time = 480;
    dto.billable = 'true';
    dto.projectId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.taskId = 'ff623892-434b-4f2d-945e-775c87bae2ac';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new EditEventDTO();
    dto.time = 12;
    dto.billable = 'test';
    dto.projectId = '1';
    dto.taskId = '2';

    const validation = await validate(dto);
    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isIn: 'time must be one of the following values: 30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480'
    });
    expect(validation[2].constraints).toMatchObject({
      isBooleanString: 'billable must be a boolean string',
    });
    expect(validation[3].constraints).toMatchObject({
      isUuid: 'projectId must be an UUID'
    });
    expect(validation[4].constraints).toMatchObject({
      isUuid: 'taskId must be an UUID'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new EditEventDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'time should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isBooleanString: 'billable must be a boolean string',
      isNotEmpty: 'billable should not be empty'
    });
  });
});
