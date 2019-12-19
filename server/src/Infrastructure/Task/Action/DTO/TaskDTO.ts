import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class TaskDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
}
