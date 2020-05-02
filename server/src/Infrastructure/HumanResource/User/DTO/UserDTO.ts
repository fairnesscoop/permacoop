import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsEmail, IsNotEmpty, IsEnum, ValidateNested} from 'class-validator';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {UserAdministrativeDTO} from './UserAdministrativeDTO';

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

  @ApiModelProperty({enum: UserRole})
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiModelProperty({type: UserAdministrativeDTO})
  @ValidateNested()
  @Type(() => UserAdministrativeDTO)
  public userAdministrative: UserAdministrativeDTO;
}
