import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccountCommand } from '@/commands/implements/accounts/update-account.command';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { UpdateAccountRepository } from '@/repositories/accounts/update-account';
import { cleanObject } from '@stokei/nestjs';

type UpdateAccountCommandKeys = keyof UpdateAccountCommand;

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountCommandHandler
  implements ICommandHandler<UpdateAccountCommand>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository,
    private readonly updateAccountRepository: UpdateAccountRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateAccountCommand) {
    if (!command) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(command);

    const account = await this.findAccountByIdRepository.execute(null);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const updated = await this.updateAccountRepository.execute(null);
    if (!updated) {
      throw new DataNotFoundException();
    }

    const accountUpdated = await this.findAccountByIdRepository.execute(null);
    if (!accountUpdated) {
      throw new AccountNotFoundException();
    }
    const accountModel = this.publisher.mergeObjectContext(accountUpdated);
    accountModel.updated();
    accountModel.commit();

    return updated;
  }

  private clearData(command: UpdateAccountCommand): UpdateAccountCommand {
    return cleanObject(command);
  }
}
