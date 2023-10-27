import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsISO8601
} from 'class-validator';
import { Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class LeaveRequestDTO {
  @IsNotEmpty()
  @IsEnum(Type)
  public type: Type;

  @IsNotEmpty()
  @IsISO8601()
  public startDate: string;

  @IsNotEmpty()
  @Transform((_, { startsAllDay }) => startsAllDay === 'true')
  @IsBoolean()
  public startsAllDay: boolean;

  @IsNotEmpty()
  @IsISO8601()
  @DateGreaterOrEqualThan('startDate')
  public endDate: string;

  @IsNotEmpty()
  @Transform((_, { endsAllDay }) => endsAllDay === 'true')
  @IsBoolean()
  public endsAllDay: boolean;

  @IsOptional()
  public comment: string;
}
