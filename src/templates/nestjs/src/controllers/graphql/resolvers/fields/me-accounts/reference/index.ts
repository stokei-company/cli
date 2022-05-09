import { Resolver, ResolveReference } from '@nestjs/graphql';
import { AccountsLoader } from '@stokei/services/accounts/controllers/graphql/dataloaders/accounts.loader';
import { MeAccount } from '@stokei/services/accounts/controllers/graphql/types/me-account';
@Resolver(() => MeAccount)
export class MeAccountReferenceResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.accountsLoader.findByIds.load(reference.id);
  }
}
