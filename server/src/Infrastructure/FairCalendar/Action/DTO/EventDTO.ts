import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsString,
  IsIn,
  IsNumberString,
  IsEnum,
  IsOptional
} from 'class-validator';
import {EventType} from 'src/Domain/FairCalendar/Event.entity';

export class EventDTO {
  @ApiModelProperty({enum: EventType})
  @IsNotEmpty()
  @IsEnum(EventType)
  public type: EventType;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['25', '50', '75', '100'])
  public time: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID()
  public projectId?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID()
  public taskId?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  public summary?: string;
}
