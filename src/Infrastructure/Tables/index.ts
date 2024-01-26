export interface ICell {
  name: string;
  renderHtml(): string;
  renderText(): string;
}

export type Row = ICell[];

export class Table {
  constructor(public readonly columns: string[], public readonly rows: Row[]) {}
}

export class Inline {
  constructor(public readonly columns: string[], public readonly row: Row) {}
}
