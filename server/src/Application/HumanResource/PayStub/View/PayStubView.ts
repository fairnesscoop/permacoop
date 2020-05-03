import {UserSummaryView} from '../../User/View/UserSummaryView';
import {FileView} from 'src/Application/File/View/FileView';

export class PayStubView {
  constructor(
    public readonly id: string,
    public readonly date: string,
    public readonly user: UserSummaryView,
    public readonly file: FileView
  ) {}
}
