import * as crypto from 'crypto';
import {IFileEncryption} from 'src/Application/IFileEncryption';

export class FileEncryptionAdapter implements IFileEncryption {
  public encrypt(buffer: Buffer, password: string): Buffer {
    const cipher = crypto.createCipher('aes-256-cbc', password);

    return Buffer.concat([cipher.update(buffer), cipher.final()]);
  }
}
