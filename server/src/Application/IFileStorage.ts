import {IUploadedFile} from '../Domain/File/IUploadedFile';

export interface IFileStorage {
  upload(file: IUploadedFile): Promise<string>;
}
