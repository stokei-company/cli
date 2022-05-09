interface IDataPasswordForgottenEvent {
  readonly accountId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly code: string;
}

export class PasswordForgottenEvent {
  readonly accountId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly code: string;

  constructor(data: IDataPasswordForgottenEvent) {
    this.accountId = data.accountId;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.code = data.code;
  }
}
