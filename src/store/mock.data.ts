import { reportInterface, reportType } from './mock.types';

export const data: Record<'reports', reportInterface[]> = {
  reports: [
    {
      id: '1',
      source: 'Business',
      amount: 900,
      type: reportType.INCOME,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '2',
      source: 'Sales',
      amount: 2000,
      type: reportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
