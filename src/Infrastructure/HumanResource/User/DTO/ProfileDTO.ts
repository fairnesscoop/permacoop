import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileDTO {
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

  @ApiPropertyOptional()
  @IsOptional()
  public password: string | null;
}
