import { AccountCreatedEvent } from '../../implements/accounts/account.created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
  implements IEventHandler<AccountCreatedEvent>
{
  async handle(event: AccountCreatedEvent) {
    const { accountId, firstname, lastname, email } = event;

    Logger.log(
      `#${accountId}(${email}) - ${firstname} ${lastname} created!`,
      AccountCreatedHandler.name
    );

    return event;
  }
}
