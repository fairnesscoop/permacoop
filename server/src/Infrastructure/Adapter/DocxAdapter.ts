import * as pathlib from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { Packer } from 'docx';
import { IDocxService } from 'src/Application/IDocxService';
import {
  DocxOptions,
  DocxFunction,
  DOCX_OPTIONS_TOKEN
} from '../docx.interfaces';

@Injectable()
export class DocxAdapter implements IDocxService {
  constructor(
    @Inject(DOCX_OPTIONS_TOKEN)
    private readonly options: DocxOptions
  ) {}

  public async toBuffer(
    name: string,
    locals: Record<string, any> = {}
  ): Promise<Buffer> {
    // Dynamically load docx generator function from:
    // {root}/{name}/docx.ts
    const path = pathlib.join(this.options.root, name, 'docx');
    const mod: any = await import(path);
    const fn: DocxFunction = mod.fn;

    const doc = fn(locals);
    return Packer.toBuffer(doc);
  }
}
