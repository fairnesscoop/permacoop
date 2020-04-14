import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, MaxLength, IsISO31661Alpha2} from 'class-validator';

export class AddressDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  public street: string;

  @ApiModelProperty()
  @IsNotEmpty()
  public city: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MaxLength(6)
  public zipCode: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsISO31661Alpha2()
  public country: string;
}
