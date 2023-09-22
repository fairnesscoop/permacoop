type SafeValue = {
  safe: any;
};

type ActionsValue = {
  actions: {
    edit?: {
      url: string;
    };
  };
};

export type Row = (string | SafeValue | ActionsValue)[];

export class Table {
  constructor(public readonly columns: string[], public readonly rows: Row[]) {}
}
