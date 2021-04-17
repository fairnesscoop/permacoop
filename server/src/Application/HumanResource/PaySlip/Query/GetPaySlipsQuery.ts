import { IQuery } from 'src/Application/IQuery';

export class GetPaySlipsQuery implements IQuery {
  constructor(public readonly page: number) {}
}
