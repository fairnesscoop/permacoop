import {ApiModelProperty} from '@nestjs/swagger';
import {ICommand} from 'src/Application/ICommand';
import {IsNotEmpty} from 'class-validator';

export class UpdateTaskCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
  public id: string;
}
