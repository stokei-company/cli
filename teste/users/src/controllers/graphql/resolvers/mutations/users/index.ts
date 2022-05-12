import { CreateUserResolver } from './create-user';
import { RemoveUserResolver } from './remove-user';
import { UpdateUserResolver } from './update-user';

export const UsersMutations = [
  CreateUserResolver,
  RemoveUserResolver,
  UpdateUserResolver,
];