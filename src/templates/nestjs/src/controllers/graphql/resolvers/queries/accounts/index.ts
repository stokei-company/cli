import { Query, Resolver } from '@nestjs/graphql';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';

@Resolver(() => Account)
export class AccountsResolver {
  @Query(() => [Account])
  accounts(): Account[] {
    return [];
  }
}
