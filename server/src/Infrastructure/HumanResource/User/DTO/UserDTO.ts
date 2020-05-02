import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum
} from 'class-validator';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';

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

  @IsOptional()
  @IsDateString()
  @ApiModelPropertyOptional()
  public entryDate?: string;

  @ApiModelProperty({enum: UserRole})
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: UserRole;
}
