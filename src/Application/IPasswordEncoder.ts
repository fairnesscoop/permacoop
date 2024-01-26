export interface IPasswordEncoder {
  hash(payload: string): Promise<string>;
  compare(hash: string, payload: string): Promise<boolean>;
}
