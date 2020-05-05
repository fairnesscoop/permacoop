import {HolidayDTO} from './HolidayDTO';
import {validate} from 'class-validator';
import {HolidayLeaveType} from 'src/Domain/HumanResource/Holiday/Holiday.entity';

describe('HolidayDTO', () => {
  it('testValidDTO', async () => {
    const dto = new HolidayDTO();
    dto.leaveType = HolidayLeaveType.PAID;
    dto.comment = 'H&M wedding';
    dto.startDate = '2019-01-04T03:24:00';
    dto.startsAllDay = 'true';
    dto.endDate = '2019-01-06T03:24:00';
    dto.endsAllDay = 'true';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidPeriodDTO', async () => {
    const dto = new HolidayDTO();
    dto.leaveType = HolidayLeaveType.PAID;
    dto.comment = 'H&M wedding';
    dto.startDate = '2019-01-04T03:24:00';
    dto.startsAllDay = 'true';
    dto.endDate = '2019-01-03T03:24:00';
    dto.endsAllDay = 'true';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      dateGreaterOrEqualThan:
        'endDate should be greater or equal than startDate'
    });
  });

  it('testInvalidDTO', async () => {
    const dto = new HolidayDTO();
    const validation = await validate(dto);

    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'leaveType must be a valid enum value',
      isNotEmpty: 'leaveType should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: 'startDate must be a ISOString',
      isNotEmpty: 'startDate should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isBooleanString: 'startsAllDay must be a boolean string',
      isNotEmpty: 'startsAllDay should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isDateString: 'endDate must be a ISOString',
      isNotEmpty: 'endDate should not be empty'
    });
    expect(validation[4].constraints).toMatchObject({
      isBooleanString: 'endsAllDay must be a boolean string',
      isNotEmpty: 'endsAllDay should not be empty'
    });
  });
});
