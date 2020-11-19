import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsEmail, IsNotEmpty, IsEnum, ValidateNested} from 'class-validator';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {UserAdministrativeDTO} from './UserAdministrativeDTO';

export class UserDTO {
  @IsNotEmpty()
  @ApiProperty()
  public firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;

  @ApiProperty({type: UserAdministrativeDTO})
  @ValidateNested()
  @Type(() => UserAdministrativeDTO)
  public userAdministrative: UserAdministrativeDTO;
}
