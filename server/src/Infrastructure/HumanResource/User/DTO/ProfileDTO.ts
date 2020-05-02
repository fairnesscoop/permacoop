import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class ProfileDTO {
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

  @IsNotEmpty()
  @ApiModelProperty()
  public password: string;
}
