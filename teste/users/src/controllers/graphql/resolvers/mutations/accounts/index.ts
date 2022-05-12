import { CreateAccountResolver } from './create-account';
import { RemoveAccountResolver } from './remove-account';
import { UpdateAccountResolver } from './update-account';

export const AccountsMutations = [
  CreateAccountResolver,
  RemoveAccountResolver,
  UpdateAccountResolver,
];