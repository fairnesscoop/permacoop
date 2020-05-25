import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, IsOptional, IsPositive} from 'class-validator';

export class DailyRateDTO {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  public userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public taskId: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public amount: number;
}
