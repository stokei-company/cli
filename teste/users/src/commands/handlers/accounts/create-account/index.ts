import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from '@/commands/implements/accounts/create-account.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAccountRepository } from '@/repositories/accounts/create-account';
import { cleanObject } from '@stokei/nestjs';

type CreateAccountCommandKeys = keyof CreateAccountCommand;

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAccountCommand) {
    if (!command) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(command);

    const accountCreated = null;
    const accountModel = this.publisher.mergeObjectContext(accountCreated);
    accountModel.created();
    accountModel.commit();

    return created;
  }

  private clearData(command: CreateAccountCommand): CreateAccountCommand {
    return cleanObject(command);
  }
}
