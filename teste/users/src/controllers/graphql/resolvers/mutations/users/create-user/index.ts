import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateUserInput } from '@/controllers/graphql/inputs/users/create-user.input';
import { User } from '@/controllers/graphql/types/user';
import { CreateUserService } from '@/services/users/create-user';

@Resolver(() => User)
export class CreateUserResolver {
  constructor(private readonly createUserService: CreateUserService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => User)
  async createUser(
    @Args('input') data: CreateUserInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createUserService.execute({
      ...data,
      parent: projectId
    });
    return response;
  }
}
