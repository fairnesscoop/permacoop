export interface ITranslator {
  translate(name: string, params?: Record<string, any>): string;
}
