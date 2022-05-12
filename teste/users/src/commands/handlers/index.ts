
import { UserCommandHandlers } from './users';

import { AccountCommandHandlers } from './accounts';


export const CommandHandlers = [
  
  ...UserCommandHandlers,
  
  ...AccountCommandHandlers,
  
];
