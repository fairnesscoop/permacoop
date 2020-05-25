import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, MaxLength, IsISO31661Alpha2} from 'class-validator';

export class AddressDTO {
  @ApiProperty()
  @IsNotEmpty()
  public street: string;

  @ApiProperty()
  @IsNotEmpty()
  public city: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(6)
  public zipCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO31661Alpha2()
  public country: string;
}
