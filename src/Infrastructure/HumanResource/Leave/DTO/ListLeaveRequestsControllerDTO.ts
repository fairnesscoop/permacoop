import { IsUUID, IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';

export class ListLeaveRequestsControllerDTO extends PaginationDTO {
  @IsUUID()
  @IsOptional()
  public userId?: string;
}
