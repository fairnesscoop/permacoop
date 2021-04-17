import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
