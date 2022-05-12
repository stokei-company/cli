import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateUserInput } from '@/controllers/graphql/inputs/users/update-user.input';
import { User } from '@/controllers/graphql/types/user';
import { UpdateUserService } from '@/services/users/update-user';

@Resolver(() => User)
export class UpdateUserResolver {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => User)
  async updateUser(
    @Args('input') data: UpdateUserInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateUserService.execute({
      ...data,
      parent: projectId
    });
    return response;
  }
}
