import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveUserInput } from '@/controllers/graphql/inputs/users/remove-user.input';
import { User } from '@/controllers/graphql/types/user';
import { RemoveUserService } from '@/services/users/remove-user';

@Resolver(() => User)
export class RemoveUserResolver {
  constructor(private readonly removeUserService: RemoveUserService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => User)
  async removeUser(
    @Args('input') data: RemoveUserInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeUserService.execute({
      ...data,
      parent: projectId
    });
    return response;
  }
}
