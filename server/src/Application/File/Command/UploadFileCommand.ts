import { IUploadedFile } from 'src/Domain/File/IUploadedFile';
import { ICommand } from 'src/Application/ICommand';

export class UploadFileCommand implements ICommand {
  constructor(public readonly uploadedFile: IUploadedFile) {}
}
