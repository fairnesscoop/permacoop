import { IQuery } from 'src/Application/IQuery';

export class GetLeaveRequestByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
