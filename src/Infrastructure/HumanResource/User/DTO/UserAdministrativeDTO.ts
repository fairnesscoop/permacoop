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

  @IsOptional()
  @IsNumber()
  @Min(0)
  public sportsPassFee: number;

  @IsNotEmpty()
  @Transform((_, { healthInsurance }) => healthInsurance === 'true')
  @IsBoolean()
  public healthInsurance: boolean;

  @IsNotEmpty()
  @Transform((_, { executivePosition }) => executivePosition === 'true')
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
