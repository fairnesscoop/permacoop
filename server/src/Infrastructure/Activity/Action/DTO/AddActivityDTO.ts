import {ApiModelProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsString,
  IsIn,
  IsNumberString
} from 'class-validator';

export class AddActivityDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['25', '50', '75', '100'])
  public time: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public projectId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public taskId: string;

  @ApiModelProperty()
  @IsString()
  public summary?: string;
}
