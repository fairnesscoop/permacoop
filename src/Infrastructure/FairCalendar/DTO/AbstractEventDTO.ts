import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsIn,
  IsEnum,
  IsOptional,
  IsInt
} from 'class-validator';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';
import { ArrayUtils } from 'src/Infrastructure/Common/Utils/ArrayUtils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class AbstractEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EventType)
  public type: EventType;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsIn([...ArrayUtils.range(30, 480, 30)])
  public time: number;

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
