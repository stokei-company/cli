interface IDataAccountCreatedEvent {
  readonly accountId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
}

export class AccountCreatedEvent {
  readonly accountId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;

  constructor(data: IDataAccountCreatedEvent) {
    this.accountId = data.accountId;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
  }
}
