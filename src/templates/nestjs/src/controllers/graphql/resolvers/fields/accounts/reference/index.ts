import { Resolver, ResolveReference } from '@nestjs/graphql';
import { AccountsLoader } from '@stokei/services/accounts/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';

@Resolver(() => Account)
export class AccountReferenceResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.accountsLoader.findByIds.load(reference.id);
  }
}