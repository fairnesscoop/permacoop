import { IsNotEmpty, MaxLength, IsISO31661Alpha2 } from 'class-validator';

export class AddCustomerDTO {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public street: string;

  @IsNotEmpty()
  public city: string;

  @IsNotEmpty()
  @MaxLength(6)
  public zipCode: string;

  @IsNotEmpty()
  @IsISO31661Alpha2()
  public country: string;
}
