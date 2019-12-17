import {ApiModelProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsString,
  IsNumber,
  IsIn
} from 'class-validator';
import {Activity} from 'src/Domain/Project/Activity.entity';

export class AddActivityDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsIn(Activity.AVAILABLE_TIMESPENTS)
  public time: number;

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
