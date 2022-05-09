import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AccessCreatedEvent } from '../events/implements/accesses/access.created.event';

@Injectable()
export class AccessesSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AccessesSagas.name);
    this.logger.log(`Saga ${AccessesSagas.name} init`);
  }

  @Saga()
  accessCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccessCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccessCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccessCreatedEvent] Saga event accessCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
