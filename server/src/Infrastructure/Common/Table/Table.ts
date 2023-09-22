type SafeValue = {
  safe: any;
};

type TransValue = {
  trans: {
    message: string;
    params?: object;
  };
};

type ActionsValue = {
  actions: {
    edit?: {
      url: string;
    };
  };
};

export type Row = (string | TransValue | SafeValue | ActionsValue)[];

export class Table {
  constructor(public readonly columns: string[], public readonly rows: Row[]) {}
}
