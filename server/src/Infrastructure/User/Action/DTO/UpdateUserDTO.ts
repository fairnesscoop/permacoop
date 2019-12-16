import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  public readonly firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  public readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public readonly email: string;

  @ApiModelProperty()
  public readonly password?: string;
}
