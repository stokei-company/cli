import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '@/commands/implements/users/update-user.command';
import {
  UserNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindUserByIdRepository } from '@/repositories/users/find-user-by-id';
import { UpdateUserRepository } from '@/repositories/users/update-user';
import { cleanObject } from '@stokei/nestjs';

type UpdateUserCommandKeys = keyof UpdateUserCommand;

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateUserCommand) {
    if (!command) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(command);

    const user = await this.findUserByIdRepository.execute(null);
    if (!user) {
      throw new UserNotFoundException();
    }

    const updated = await this.updateUserRepository.execute(null);
    if (!updated) {
      throw new DataNotFoundException();
    }

    const userUpdated = await this.findUserByIdRepository.execute(null);
    if (!userUpdated) {
      throw new UserNotFoundException();
    }
    const userModel = this.publisher.mergeObjectContext(userUpdated);
    userModel.updated();
    userModel.commit();

    return updated;
  }

  private clearData(command: UpdateUserCommand): UpdateUserCommand {
    return cleanObject(command);
  }
}
