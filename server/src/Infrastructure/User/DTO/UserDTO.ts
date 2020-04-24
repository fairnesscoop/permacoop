import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsDateString} from 'class-validator';

export class UserDTO {
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

  @IsNotEmpty()
  @IsDateString()
  @ApiModelProperty()
  public entryDate: string;
}
