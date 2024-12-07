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
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LeaveRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  public type: Type;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  public startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((_, { startsAllDay }) => startsAllDay === 'true')
  @IsBoolean()
  public startsAllDay: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  @DateGreaterOrEqualThan('startDate')
  public endDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((_, { endsAllDay }) => endsAllDay === 'true')
  @IsBoolean()
  public endsAllDay: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public comment: string;
}
