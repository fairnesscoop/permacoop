import {Injectable} from '@nestjs/common';
import * as argon2 from 'argon2';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';

@Injectable()
export class EncryptionAdapter implements IEncryptionAdapter {
  public hash = async (payload: string): Promise<string> => {
    return await argon2.hash(payload);
  };

  public compare = async (hash: string, payload: string): Promise<boolean> => {
    return await argon2.verify(hash, payload);
  };
}
