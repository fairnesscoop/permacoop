import { Inject, Injectable } from '@nestjs/common';
import { ITranslator } from '../Translations/ITranslator';
import { Table } from './';

@Injectable()
export class TableCsvFactory {
  constructor(
    @Inject('ITranslator')
    private translator: ITranslator
  ) {}

  public toCsv(table: Table): string {
    const header = table.columns.map(column =>
      this.translator.translate(column.toString())
    );
    const rows = table.rows.map(row =>
      row
        .map(cell => {
          const text = cell.renderText();
          return `"${text}"`; // Use quotes to allow newlines
        })
        .join(';')
    );
    return [header.join(';'), ...rows].join('\n');
  }
}
