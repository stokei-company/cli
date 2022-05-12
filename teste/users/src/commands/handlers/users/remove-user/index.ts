import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveUserCommand } from '@/commands/implements/users/remove-user.command';
import {
  UserNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindUserByIdRepository } from '@/repositories/users/find-user-by-id';
import { RemoveUserRepository } from '@/repositories/users/remove-user';
import { cleanObject } from '@stokei/nestjs';

type RemoveUserCommandKeys = keyof RemoveUserCommand;

@CommandHandler(RemoveUserCommand)
export class RemoveUserCommandHandler
  implements ICommandHandler<RemoveUserCommand>
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly removeUserRepository: RemoveUserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveUserCommand) {
    if (!command) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(command);

    const user = await this.findUserByIdRepository.execute(null);
    if (!user) {
      throw new UserNotFoundException();
    }

    const removed = await this.removeUserRepository.execute(null);
    if (!removed) {
      throw new DataNotFoundException();
    }

    const userRemoved = await this.findUserByIdRepository.execute(null);
    if (!userRemoved) {
      throw new UserNotFoundException();
    }
    const userModel = this.publisher.mergeObjectContext(userRemoved);
    userModel.removed();
    userModel.commit();

    return removed;
  }

  private clearData(command: RemoveUserCommand): RemoveUserCommand {
    return cleanObject(command);
  }
}
