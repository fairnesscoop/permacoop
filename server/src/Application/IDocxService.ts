export interface IDocxService {
  toBuffer(name: string, locals?: Record<string, any>): Promise<Buffer>;
}
