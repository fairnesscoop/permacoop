import {IUploadedFile} from 'src/Domain/File/IUploadedFile';

export class PDFValidator {
  public static isValid(file: IUploadedFile): boolean {
    return 'application/pdf' === file.mimetype;
  }
}
