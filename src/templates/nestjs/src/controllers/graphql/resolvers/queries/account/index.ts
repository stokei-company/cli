import { Args, Query, Resolver } from '@nestjs/graphql';
import { AccountsLoader } from '@stokei/services/accounts/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @Query(() => Account)
  async account(@Args('id') id: string) {
    return await this.accountsLoader.findByIds.load(id);
  }
}
