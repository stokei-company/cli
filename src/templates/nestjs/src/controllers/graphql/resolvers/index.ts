import { FieldsResolvers } from './fields';
import { Mutations } from './mutations';
import { Queries } from './queries';

export const Resolvers = [
  ...FieldsResolvers,
  ...Mutations,
  ...Queries
  //...Subscriptions
];
