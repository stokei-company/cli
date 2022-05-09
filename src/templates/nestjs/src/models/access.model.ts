import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/shared';
import { ServerAccountIdPrefix } from '../enums/server-id-prefix.enum';
import { AccessCreatedEvent } from '../events/implements/accesses/access.created.event';
import { AccountModel } from './account.model';

export interface IAccessModelData {
  accessToken?: string;
  refreshToken?: string;
  readonly id?: string;
  readonly _id?: string;
  readonly accountId: string;
  readonly active?: boolean;
  readonly expiresIn: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class AccessModel extends AggregateRoot {
  accessToken?: string;
  refreshToken?: string;
  readonly id: string;
  readonly accountId: string;
  readonly active?: boolean;
  readonly expiresIn: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;

  constructor(data: IAccessModelData) {
    super();

    this.id = createServiceId({
      service: ServerAccountIdPrefix.ACCOUNTS,
      module: ServerAccountIdPrefix.ACCESES,
      id: data._id?.toString() || data.id
    });
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.accountId = data.accountId;
    this.active = data.active;
    this.expiresIn = data.expiresIn;
    this.canceledAt = data.canceledAt;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdAccess(account: AccountModel) {
    if (this.id) {
      this.apply(
        new AccessCreatedEvent({
          account,
          accessId: this.id
        })
      );
    }
  }
}
