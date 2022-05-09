import { AccessCreatedEvent } from '../../implements/accesses/access.created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(AccessCreatedEvent)
export class AccessCreatedHandler implements IEventHandler<AccessCreatedEvent> {
  async handle(event: AccessCreatedEvent) {
    const { accessId, account } = event;

    Logger.log(
      `Access#(${accessId}) - ${account.firstname} ${account.lastname} sing in with ${account.email}!`,
      AccessCreatedHandler.name
    );

    return event;
  }
}
