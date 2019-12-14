import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class UpdateProfileCommand implements ICommand {
  @IsNotEmpty()
  @ApiModelProperty()
  public firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public email: string;

  @ApiModelProperty()
  public password?: string;

  public user: User;
}
