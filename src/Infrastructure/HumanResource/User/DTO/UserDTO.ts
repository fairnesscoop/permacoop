import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserAdministrativeDTO } from './UserAdministrativeDTO';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO extends UserAdministrativeDTO {
  @ApiProperty()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}
