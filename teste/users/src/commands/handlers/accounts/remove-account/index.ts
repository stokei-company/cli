import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveAccountCommand } from '@/commands/implements/accounts/remove-account.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { RemoveAccountRepository } from '@/repositories/accounts/remove-account';
import { cleanObject } from '@stokei/nestjs';

type RemoveAccountCommandKeys = keyof RemoveAccountCommand;

@CommandHandler(RemoveAccountCommand)
export class RemoveAccountCommandHandler
  implements ICommandHandler<RemoveAccountCommand>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly removeAccountRepository: RemoveAccountRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAccountCommand) {
    if (!command) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(command);

    const account = await this.findAccountByIdRepository.execute(null);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const removed = await this.removeAccountRepository.execute(null);
    if (!removed) {
      throw new DataNotFoundException();
    }

    const accountRemoved = await this.findAccountByIdRepository.execute(null);
    if (!accountRemoved) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountRemoved);
    accountModel.removed();
    accountModel.commit();

    return removed;
  }

  private clearData(command: RemoveAccountCommand): RemoveAccountCommand {
    return cleanObject(command);
  }
}
