import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, IsDateString} from 'class-validator';

export class MonthlyEventsDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;
}
