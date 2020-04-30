export interface IFileEncryption {
  encrypt(buffer: Buffer): Promise<Buffer>;
  decrypt(buffer: Buffer): Promise<Buffer>;
}
