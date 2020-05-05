import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBooleanString
} from 'class-validator';
import {HolidayLeaveType} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {DateGreaterOrEqualThan} from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class HolidayDTO {
  @ApiModelProperty({enum: HolidayLeaveType})
  @IsNotEmpty()
  @IsEnum(HolidayLeaveType)
  public leaveType: HolidayLeaveType;

  @IsNotEmpty()
  @IsDateString()
  @ApiModelProperty()
  public startDate: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiModelProperty()
  public startsAllDay: string;

  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('startDate')
  @ApiModelProperty()
  public endDate: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiModelProperty()
  public endsAllDay: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  public comment: string;
}
