import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { AddressDTO } from './AddressDTO';

export class CustomerDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ type: AddressDTO })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AddressDTO)
  public address: AddressDTO;
}
