import { validate } from 'class-validator';
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { GetLeaveRequestsDTO } from './GetLeaveRequestsDTO';

describe('GetLeaveRequestsDTO', () => {
  it('testValidDto', async () => {
    const dto = new GetLeaveRequestsDTO();
    dto.page = 1;
    dto.limit = 19;
    dto.status = Status.ACCEPTED;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDto', async () => {
    const dto = new GetLeaveRequestsDTO();
    dto.page = -1;
    dto.limit = -10;
    dto.status = Status.ACCEPTED;

    const validation = await validate(dto);

    expect(validation).toHaveLength(2);

    expect(validation[0].constraints).toMatchObject({
      isPositive: 'limit must be a positive number'
    });

    expect(validation[1].constraints).toMatchObject({
      min: 'page must not be less than 1'
    });
  });
});
