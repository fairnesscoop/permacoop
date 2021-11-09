import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsEmailOrEmpty } from 'src/Infrastructure/Common/Validator/IsEmailOrEmpty';
import { IsPhoneNumberOrEmpty } from 'src/Infrastructure/Common/Validator/IsPhoneNumberOrEmpty';

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
  @IsEmailOrEmpty()
  @IsOptional()
  public email: string;

  @ApiPropertyOptional()
  @IsPhoneNumberOrEmpty('FR')
  @IsOptional()
  public phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  public notes: string;
}
