import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ProfileDTO {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsOptional()
  public password: string | null;
}
