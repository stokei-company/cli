import { MeAccountAccessesResolver } from './accesses';
import { MeAccountReferenceResolver } from './reference';

export const MeAccountsFieldsResolvers = [
  MeAccountReferenceResolver,
  MeAccountAccessesResolver
];
