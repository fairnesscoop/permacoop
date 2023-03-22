import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';

export class GetLeaveRequestsDTO extends PaginationDTO {
  @IsOptional()
  @ApiPropertyOptional({ enum: Status })
  @IsEnum(Status)
  public status: Status;
}
