import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBooleanString
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
  @IsBooleanString()
  @ApiProperty()
  public startsAllDay: string;

  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('startDate')
  @ApiProperty()
  public endDate: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty()
  public endsAllDay: string;

  @IsOptional()
  @ApiPropertyOptional()
  public comment: string;
}
