import { CreateAccountCommandHandler } from './create-account';
import { RemoveAccountCommandHandler } from './remove-account';
import { UpdateAccountCommandHandler } from './update-account';

export const AccountCommandHandlers = [
  CreateAccountCommandHandler,
  RemoveAccountCommandHandler,
  UpdateAccountCommandHandler
];
