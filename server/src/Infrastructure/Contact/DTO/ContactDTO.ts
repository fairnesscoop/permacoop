import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsEmail } from 'class-validator';

export class ContactDTO {
  @ApiPropertyOptional()
  @IsOptional()
  public firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  public lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  public company: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  public email: string;

  @ApiPropertyOptional()
  @IsPhoneNumber('FR')
  @IsOptional()
  public phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  public notes: string;
}
