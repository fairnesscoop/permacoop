import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
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
  @ApiModelProperty()
  public annualEarnings: number;

  @IsOptional()
  @IsPositive()
  @ApiModelPropertyOptional()
  public transportFee: number;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiModelProperty()
  public healthInsurance: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiModelProperty()
  public executivePosition: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiModelProperty()
  public joiningDate: string;

  @IsOptional()
  @IsDateString()
  @ApiModelPropertyOptional()
  public leavingDate: string;

  @ApiModelProperty({enum: ContractType})
  @IsNotEmpty()
  @IsEnum(ContractType)
  public contract: ContractType;
}
