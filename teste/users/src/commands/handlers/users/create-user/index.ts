import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@/commands/implements/users/create-user.command';
import {
  UserNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateUserRepository } from '@/repositories/users/create-user';
import { cleanObject } from '@stokei/nestjs';

type CreateUserCommandKeys = keyof CreateUserCommand;

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    if (!command) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(command);

    const userCreated = null;
    const userModel = this.publisher.mergeObjectContext(userCreated);
    userModel.created();
    userModel.commit();

    return created;
  }

  private clearData(command: CreateUserCommand): CreateUserCommand {
    return cleanObject(command);
  }
}
