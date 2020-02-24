import {Injectable} from '@nestjs/common';
import * as argon2 from 'argon2';
import {IEncryption} from 'src/Application/IEncryption';

@Injectable()
export class EncryptionAdapter implements IEncryption {
  public hash(payload: string): Promise<string> {
    return argon2.hash(payload);
  }

  public compare(hash: string, payload: string): Promise<boolean> {
    return argon2.verify(hash, payload);
  }
}
