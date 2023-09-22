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

export abstract class AbstractEventDTO {
  @IsNotEmpty()
  @IsEnum(EventType)
  public type: EventType;

  @IsNotEmpty()
  @IsInt()
  @IsIn([...ArrayUtils.range(30, 480, 30)].map(n => n.toString()))
  public time: number;

  @IsOptional()
  @IsUUID()
  public projectId?: string;

  @IsOptional()
  @IsUUID()
  public taskId?: string;

  @IsOptional()
  @IsString()
  public summary?: string;
}
