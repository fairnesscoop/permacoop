import {IUploadedFile} from '../Domain/File/IUploadedFile';

export interface IFileStorage {
  upload(file: IUploadedFile, password: string): Promise<string>;
}
