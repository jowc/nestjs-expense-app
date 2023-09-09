export enum reportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface reportInterface {
  id?: string;
  source: string;
  amount: number;
  type: reportType;
  created_at?: Date;
  updated_at?: Date;
}
