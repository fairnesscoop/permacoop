import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsPositive,
  IsInt,
  IsBooleanString
} from 'class-validator';
import {ContractType} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export class UserAdministrativeDTO {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public annualEarnings: number;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional()
  public transportFee: number;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty()
  public healthInsurance: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty()
  public executivePosition: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  public joiningDate: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  public leavingDate: string;

  @ApiProperty({enum: ContractType})
  @IsNotEmpty()
  @IsEnum(ContractType)
  public contract: ContractType;
}
