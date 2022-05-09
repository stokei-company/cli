import { AccountsFieldsResolvers } from './accounts';
import { MeAccountsFieldsResolvers } from './me-accounts';

export const FieldsResolvers = [
  ...AccountsFieldsResolvers,
  ...MeAccountsFieldsResolvers
];
