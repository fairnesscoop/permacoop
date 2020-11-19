import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsIn,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBooleanString
} from 'class-validator';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';
import { ArrayUtils } from 'src/Infrastructure/Common/Utils/ArrayUtils';

export abstract class AbstractEventDTO {
  @ApiProperty({enum: EventType})
  @IsNotEmpty()
  @IsEnum(EventType)
  public type: EventType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([...ArrayUtils.range(30, 480, 30)])
  public time: number;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty()
  public billable: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public projectId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public taskId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public summary?: string;
}
