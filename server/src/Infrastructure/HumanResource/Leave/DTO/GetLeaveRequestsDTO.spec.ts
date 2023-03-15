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
});
