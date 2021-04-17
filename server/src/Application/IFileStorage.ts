import { IUploadedFile } from '../Domain/File/IUploadedFile';
import { File } from 'src/Domain/File/File.entity';

export interface IFileStorage {
  upload(file: IUploadedFile): Promise<string | null>;
  download(file: File): Promise<Buffer | null>;
}
