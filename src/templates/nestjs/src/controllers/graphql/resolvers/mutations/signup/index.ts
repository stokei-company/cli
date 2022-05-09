import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/auth';
import { SignUpInput } from '@stokei/services/accounts/controllers/graphql/inputs/accounts/singup.input';
import { Account } from '@stokei/services/accounts/controllers/graphql/types/account';
import { SignUpService } from '@stokei/services/accounts/services/accounts/signup';
import { AuthResponse } from '../../../types/auth-response';

@Resolver(() => Account)
export class SignUpResolver {
  constructor(private readonly signUpService: SignUpService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => AuthResponse)
  async signUp(
    @Args('input') data: SignUpInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.signUpService.execute({
      ...data,
      parent: projectId
    });
    return response;
  }
}
