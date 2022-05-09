import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PasswordChangedEvent } from '../../implements/accounts/password.changed.event';

@EventsHandler(PasswordChangedEvent)
export class PasswordChangedHandler
  implements IEventHandler<PasswordChangedEvent>
{
  async handle(event: PasswordChangedEvent) {
    const { accountId, firstname, lastname, email } = event;

    Logger.log(
      `#${accountId}(${email}) - ${firstname} ${lastname} changed password!`,
      PasswordChangedHandler.name
    );

    return event;
  }
}
