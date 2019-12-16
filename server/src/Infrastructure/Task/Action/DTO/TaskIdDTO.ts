import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class TaskIdDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public readonly id: string;
}
