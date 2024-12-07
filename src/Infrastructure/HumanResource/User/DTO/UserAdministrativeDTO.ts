import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsPositive,
  IsInt,
  IsNumber,
  IsBoolean,
  Min,
  IsISO8601,
  ValidateIf
} from 'class-validator';
import {
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserAdministrativeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public annualEarnings: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  public transportFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  public sustainableMobilityFee: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((_, { healthInsurance }) => healthInsurance === 'true')
  @IsBoolean()
  public healthInsurance: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Transform((_, { executivePosition }) => executivePosition === 'true')
  @IsBoolean()
  public executivePosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  public joiningDate: string;

  @ApiProperty()
  @IsISO8601()
  @ValidateIf(v => v.leavingDate !== '')
  public leavingDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ContractType)
  public contract: ContractType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(WorkingTimeType)
  public workingTime: WorkingTimeType;
}
