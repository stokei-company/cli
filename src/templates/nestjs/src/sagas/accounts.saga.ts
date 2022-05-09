import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { AccountCreatedEvent } from '../events/implements/accounts/account.created.event';
import { PasswordChangedEvent } from '../events/implements/accounts/password.changed.event';
import { PasswordForgottenEvent } from '../events/implements/accounts/password.forgotten.event';

@Injectable()
export class AccountsSagas {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(AccountsSagas.name);
    this.logger.log(`Saga ${AccountsSagas.name} init`);
  }

  @Saga()
  accountCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountCreatedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [AccountCreatedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [AccountCreatedEvent] Saga event accountCreated: ' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  passwordChanged = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PasswordChangedEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PasswordChangedEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PasswordChangedEvent] Saga event passwordChanged:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };

  @Saga()
  passwordForgotten = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PasswordForgottenEvent),
      delay(500),
      map((event) => {
        this.logger.log(
          'Inside [PasswordForgottenEvent] Saga for example send a email'
        );
        this.logger.log(
          'Inside [PasswordForgottenEvent] Saga event passwordForgotten:' +
            JSON.stringify(event)
        );
        return null;
      })
    );
  };
}
