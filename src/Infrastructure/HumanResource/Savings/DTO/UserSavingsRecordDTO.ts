import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class UserSavingsRecordDTO {  
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  public userId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public amount: number;
}
