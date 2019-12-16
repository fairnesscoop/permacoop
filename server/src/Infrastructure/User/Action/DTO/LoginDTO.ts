import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public readonly email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  public readonly password: string;
}
