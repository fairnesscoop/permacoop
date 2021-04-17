import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ProfileDTO {
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
}
