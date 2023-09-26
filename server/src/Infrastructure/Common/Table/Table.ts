type SafeValue = {
  safe: any;
};

type TransValue = {
  trans: {
    message: string;
    params?: object;
  };
};

export type ActionsValue = {
  actions: {
    view?: {
      url: string;
    };
    edit?: {
      url: string;
    };
    delete?: {
      url: string;
    };
  };
};

export type Row = (string | number | TransValue | SafeValue | ActionsValue)[];

export class Table {
  constructor(public readonly columns: string[], public readonly rows: Row[]) {}
}

export class Inline {
  constructor(public readonly columns: string[], public readonly row: Row) {}
}
