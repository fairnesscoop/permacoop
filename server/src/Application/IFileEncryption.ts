export interface IFileEncryption {
  encrypt(buffer: Buffer, password: string): Buffer;
}
