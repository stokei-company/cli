interface IDataPasswordChangedEvent {
  readonly accountId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
}

export class PasswordChangedEvent {
  readonly accountId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;

  constructor(data: IDataPasswordChangedEvent) {
    this.accountId = data.accountId;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
  }
}
