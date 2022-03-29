import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
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
  @IsUUID()
  public customerId: string;
}
