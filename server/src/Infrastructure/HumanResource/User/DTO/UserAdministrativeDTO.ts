import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsPositive,
  IsInt,
  IsBooleanString,
  IsNumber
} from 'class-validator';
import {
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
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
  @IsNumber()
  @ApiPropertyOptional()
  public transportFee: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public sustainableMobilityFee: number;

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

  @ApiProperty({ enum: ContractType })
  @IsNotEmpty()
  @IsEnum(ContractType)
  public contract: ContractType;

  @ApiProperty({ enum: WorkingTimeType })
  @IsNotEmpty()
  @IsEnum(WorkingTimeType)
  public workingTime: WorkingTimeType;
}
