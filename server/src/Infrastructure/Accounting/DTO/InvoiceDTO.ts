import { ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsPositive, IsDateString } from 'class-validator';

export class InvoiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public projectId: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public expireInDays: number;
}
