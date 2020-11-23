import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { InvoiceUnits } from 'src/Domain/Project/Project.entity';

export class ProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InvoiceUnits)
  public invoiceUnit: InvoiceUnits;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn([420, 480])
  public dayDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;
}
