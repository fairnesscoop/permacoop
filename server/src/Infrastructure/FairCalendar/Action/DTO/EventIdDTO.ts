import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class EventIdDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
