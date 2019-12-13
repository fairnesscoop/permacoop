import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {IQuery} from 'src/Application/IQuery';

export class GetTaskByIdQuery implements IQuery {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
