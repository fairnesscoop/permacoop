export interface IUploadedFile {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
