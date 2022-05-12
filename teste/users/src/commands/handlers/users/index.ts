import { CreateUserCommandHandler } from './create-user';
import { RemoveUserCommandHandler } from './remove-user';
import { UpdateUserCommandHandler } from './update-user';

export const UserCommandHandlers = [
  CreateUserCommandHandler,
  RemoveUserCommandHandler,
  UpdateUserCommandHandler
];
