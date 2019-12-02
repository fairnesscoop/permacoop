import {ICommand} from 'src/Application/ICommand';
import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateCustomerCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
}
