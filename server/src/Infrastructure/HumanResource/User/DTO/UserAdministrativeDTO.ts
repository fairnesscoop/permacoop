import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsPositive,
  IsInt,
  IsBoolean
} from 'class-validator';
import { ContractType } from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';

export class UserAdministrativeDTO {
  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: UserRole;

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
  @IsBoolean()
  @ApiProperty()
  public healthInsurance: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  public executivePosition: boolean;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  public joiningDate: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  public leavingDate: string;

  @ApiProperty({ enum: ContractType })
  @IsNotEmpty()
  @IsEnum(ContractType)
  public contract: ContractType;
}
