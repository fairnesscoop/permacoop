import { Document } from 'docx';

export const DOCX_OPTIONS_TOKEN = 'DOCX_OPTIONS';

export interface DocxOptions {
  root: string;
}

export type DocxFunction = (locals: Record<string, any>) => Document;
