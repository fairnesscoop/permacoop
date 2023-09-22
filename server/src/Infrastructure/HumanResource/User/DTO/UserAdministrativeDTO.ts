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

export class UserAdministrativeDTO {
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: UserRole;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public annualEarnings: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public transportFee: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public sustainableMobilityFee: number;

  @IsNotEmpty()
  @IsBoolean()
  public healthInsurance: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public executivePosition: boolean;

  @IsNotEmpty()
  @IsISO8601()
  public joiningDate: string;

  @IsISO8601()
  @ValidateIf(v => v.leavingDate !== '')
  public leavingDate: string;

  @IsNotEmpty()
  @IsEnum(ContractType)
  public contract: ContractType;

  @IsNotEmpty()
  @IsEnum(WorkingTimeType)
  public workingTime: WorkingTimeType;
}
