import { AccountModel } from '@stokei/services/accounts/models/account.model';

interface IDataAccessCreatedEvent {
  readonly accessId: string;
  readonly account: AccountModel;
}

export class AccessCreatedEvent {
  readonly accessId: string;
  readonly account: AccountModel;

  constructor(data: IDataAccessCreatedEvent) {
    this.accessId = data.accessId;
    this.account = data.account;
  }
}
