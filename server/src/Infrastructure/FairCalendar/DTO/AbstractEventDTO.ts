import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsIn,
  IsNumberString,
  IsEnum,
  IsOptional
} from 'class-validator';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';

export abstract class AbstractEventDTO {
  @ApiProperty({enum: EventType})
  @IsNotEmpty()
  @IsEnum(EventType)
  public type: EventType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['25', '50', '75', '100'])
  public time: string;

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
