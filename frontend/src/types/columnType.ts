export type ColumnT = {
  cid: number;
  dflt_value: any;
  name: string;
  notnull: number;
  pk: number;
  type: string;
};

export type ColumnDataT = {
  [key: string]: string | number; // Dynamic property
  count: number;
  avg_age: number;
};
