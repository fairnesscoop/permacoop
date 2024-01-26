import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserAdministrativeDTO } from './UserAdministrativeDTO';

export class UserDTO extends UserAdministrativeDTO {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
