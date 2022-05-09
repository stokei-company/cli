import { ResolveField, Resolver } from '@nestjs/graphql';
import { MeAccount } from '@stokei/services/accounts/controllers/graphql/types/me-account';
import { FindAccountByIdService } from '@stokei/services/accounts/services/accounts/find-account-by-id';

@Resolver(() => MeAccount)
export class MeAccountAccessesResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField()
  accesses() {
    //@Parent() account: MeAccount
    return [];
  }
}
