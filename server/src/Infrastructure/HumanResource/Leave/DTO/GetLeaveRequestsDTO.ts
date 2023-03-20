import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';

export class GetLeaveRequestsDTO extends PaginationDTO {
  @IsOptional()
  @ApiPropertyOptional()
  @IsPositive()
  @Type(() => Number)
  public limit: number;

  @IsOptional()
  @ApiPropertyOptional({ enum: Status })
  @IsEnum(Status)
  public status: Status;
}
