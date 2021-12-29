import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean
} from 'class-validator';
import { Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class LeaveRequestDTO {
  @ApiProperty({ enum: Type })
  @IsNotEmpty()
  @IsEnum(Type)
  public type: Type;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  public startDate: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  public startsAllDay: boolean;

  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('startDate')
  @ApiProperty()
  public endDate: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  public endsAllDay: boolean;

  @IsOptional()
  @ApiPropertyOptional()
  public comment: string;
}
