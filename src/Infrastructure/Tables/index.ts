import { HtmlColumn } from './HtmlColumn';

type IColumn = string | HtmlColumn;

export interface ICell {
  name: string;
  renderHtml(): string;
  renderText(): string;
}

export type Row = ICell[];

export class Table {
  constructor(
    public readonly columns: IColumn[],
    public readonly rows: Row[]
  ) {}
}

export class Inline {
  constructor(public readonly columns: IColumn[], public readonly row: Row) {}
}
