import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PasswordForgottenEvent } from '../../implements/accounts/password.forgotten.event';

@EventsHandler(PasswordForgottenEvent)
export class PasswordForgottenHandler
  implements IEventHandler<PasswordForgottenEvent>
{
  async handle(event: PasswordForgottenEvent) {
    const { accountId, firstname, lastname, email } = event;

    Logger.log(
      `#${accountId}(${email}) - ${firstname} ${lastname} forgot his password!`,
      PasswordForgottenHandler.name
    );

    return event;
  }
}
