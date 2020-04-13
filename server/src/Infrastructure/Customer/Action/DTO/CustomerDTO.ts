import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNotEmpty, ValidateNested} from 'class-validator';
import {AddressDTO} from './AddressDTO';

export class CustomerDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;

  @ApiModelProperty({type: AddressDTO})
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AddressDTO)
  public address: AddressDTO;
}
