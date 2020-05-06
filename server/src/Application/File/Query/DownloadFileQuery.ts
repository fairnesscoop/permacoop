import {IQuery} from 'src/Application/IQuery';

export class DownloadFileQuery implements IQuery {
  constructor(public readonly id: string) {}
}
