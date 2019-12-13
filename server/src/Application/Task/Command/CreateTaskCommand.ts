import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';

export class CreateTaskCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
}
