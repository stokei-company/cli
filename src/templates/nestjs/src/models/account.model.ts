import { AggregateRoot } from '@nestjs/cqrs';
import { AccountStatus } from '@stokei/services/accounts/enums/account-status.enum';
import { AccountCreatedEvent } from '@stokei/services/accounts/events/implements/accounts/account.created.event';
import { PasswordChangedEvent } from '@stokei/services/accounts/events/implements/accounts/password.changed.event';
import { PasswordForgottenEvent } from '@stokei/services/accounts/events/implements/accounts/password.forgotten.event';
import { cleanValue, createServiceId } from '@stokei/shared';
import { Exclude } from 'class-transformer';
import { ServerAccountIdPrefix } from '../enums/server-id-prefix.enum';

export interface IAccountModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly parent?: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly lastPassword?: string;
  readonly salt: string;
  readonly avatar?: string;
  readonly forgotPasswordCode?: string;
  readonly dateBirthday?: string;
  readonly status: AccountStatus;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly roles: string[];
}

export class AccountModel extends AggregateRoot {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly fullname: string;
  readonly parent?: string;
  readonly email: string;
  readonly username: string;
  @Exclude()
  readonly password: string;
  @Exclude()
  readonly lastPassword?: string;
  @Exclude()
  readonly salt: string;

  readonly avatar?: string;
  @Exclude()
  readonly forgotPasswordCode?: string;
  readonly dateBirthday?: string;
  readonly status: AccountStatus;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly roles: string[];
  constructor(data: IAccountModelData) {
    super();

    this.id = createServiceId({
      service: ServerAccountIdPrefix.ACCOUNTS,
      module: ServerAccountIdPrefix.ACCOUNTS,
      id: data._id?.toString() || data.id
    });
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.fullname = cleanValue(`${data.firstname} ${data.lastname}`);
    this.parent = data.parent;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.lastPassword = data.lastPassword;
    this.salt = data.salt;
    this.avatar = data.avatar;
    this.forgotPasswordCode = data.forgotPasswordCode;
    this.dateBirthday = data.dateBirthday;
    this.status = data.status;
    this.canceledAt = data.canceledAt;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
    this.roles = data.roles;
  }

  createdAccount() {
    if (this.id && this.email) {
      this.apply(
        new AccountCreatedEvent({
          accountId: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email
        })
      );
    }
  }

  async changedPassword() {
    if (this.id && this.email) {
      this.apply(
        new PasswordChangedEvent({
          accountId: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email
        })
      );
    }
  }

  async forgottenPassword() {
    if (this.id && this.email) {
      this.apply(
        new PasswordForgottenEvent({
          accountId: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          code: this.forgotPasswordCode
        })
      );
    }
  }
}
