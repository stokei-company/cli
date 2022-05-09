import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AccountsLoader } from '@stokei/services/accounts/controllers/graphql/dataloaders/accounts.loader';
import { MeAccount } from '@stokei/services/accounts/controllers/graphql/types/me-account';
import { AccountNotFoundException } from '@stokei/services/accounts/errors';
import { CurrentAccount, IAuthenticatedAccount } from '@stokei/auth';
import { AuthenticatedGuard } from '@stokei/auth';

@Resolver(() => MeAccount)
export class MeAccountResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @UseGuards(AuthenticatedGuard)
  @Query(() => MeAccount)
  async me(@CurrentAccount() account: IAuthenticatedAccount) {
    if (!account?.id) {
      throw new AccountNotFoundException();
    }
    return await this.accountsLoader.findByIds.load(account?.id);
  }
}
