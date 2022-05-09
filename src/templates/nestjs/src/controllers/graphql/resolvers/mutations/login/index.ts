import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/auth';
import { LoginInput } from '@stokei/services/accounts/controllers/graphql/inputs/accounts/login.input';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';
import { LoginService } from '@stokei/services/accounts/services/accounts/login';
import { AuthResponse } from '../../../types/auth-response';

@Resolver(() => Account)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => AuthResponse)
  async login(
    @Args('input') data: LoginInput,
    @CurrentProject('id') projectId: string
  ) {
    return await this.loginService.execute({ ...data, parent: projectId });
  }
}
