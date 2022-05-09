import { AccessQueriesHandlers } from './accesses';
import { AccountQueriesHandlers } from './accounts';

export const QueriesHandlers = [
  ...AccountQueriesHandlers,
  ...AccessQueriesHandlers
];
