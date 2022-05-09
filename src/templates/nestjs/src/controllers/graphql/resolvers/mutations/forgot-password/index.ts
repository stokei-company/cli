import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/auth';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';
import { ForgotPasswordService } from '@stokei/services/accounts/services/accounts/forgot-password';
import { ForgotPasswordInput } from '../../../inputs/accounts/forgot-password.input';

@Resolver(() => Account)
export class ForgotPasswordResolver {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Boolean)
  async forgotPassword(
    @Args('input') data: ForgotPasswordInput,
    @CurrentProject('id') projectId: string
  ) {
    return (
      await this.forgotPasswordService.execute({ ...data, parent: projectId })
    )?.ok;
  }
}
