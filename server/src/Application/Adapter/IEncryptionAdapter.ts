export interface IEncryptionAdapter {
  hash(payload: string): Promise<string>;
  compare(hash: string, payload: string): Promise<boolean>;
}
