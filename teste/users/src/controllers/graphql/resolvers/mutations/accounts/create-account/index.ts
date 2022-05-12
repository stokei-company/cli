import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateAccountInput } from '@/controllers/graphql/inputs/accounts/create-account.input';
import { Account } from '@/controllers/graphql/types/account';
import { CreateAccountService } from '@/services/accounts/create-account';

@Resolver(() => Account)
export class CreateAccountResolver {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Account)
  async createAccount(
    @Args('input') data: CreateAccountInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createAccountService.execute({
      ...data,
      parent: projectId
    });
    return response;
  }
}
