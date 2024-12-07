import { IsUUID, IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ListLeaveRequestsControllerDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  public userId?: string;
}
