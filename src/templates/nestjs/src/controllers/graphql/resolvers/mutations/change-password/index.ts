import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';
import { ChangePasswordService } from '@stokei/services/accounts/services/accounts/change-password';
import { ChangePasswordInput } from '../../../inputs/accounts/change-password.input';

@Resolver(() => Account)
export class ChangePasswordResolver {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Mutation(() => Boolean)
  async changePassword(@Args('input') data: ChangePasswordInput) {
    return (await this.changePasswordService.execute(data))?.ok;
  }
}
