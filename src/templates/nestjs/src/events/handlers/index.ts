import { AccessEventsHandlers } from './accesses';
import { AccountEventsHandlers } from './accounts';

export const EventsHandlers = [
  ...AccountEventsHandlers,
  ...AccessEventsHandlers
];
