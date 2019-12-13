import {ICommand} from 'src/Application/ICommand';
import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {Task} from 'src/Domain/Project/Task.entity';

export class UpdateTaskCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
  public id: string;
}
