import { CreateAccessRepository } from './create-access';
import { FindAccessByIdRepository } from './find-access-by-id';
import { RefreshAccessRepository } from './refresh-access';

export const AccessRepositories = [
  CreateAccessRepository,
  RefreshAccessRepository,
  FindAccessByIdRepository
];
