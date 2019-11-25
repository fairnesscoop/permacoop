import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';

export class LoginCommand implements ICommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public readonly email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  public readonly password: string;
}
