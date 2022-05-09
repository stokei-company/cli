import { nanoid } from 'nanoid';
import {
  AccessModel,
  IAccessModelData
} from '@stokei/services/accounts/models/access.model';
import { convertToISODateString } from '@stokei/shared';

export class AccessModelMock extends AccessModel {
  constructor(data?: Partial<IAccessModelData>) {
    super({
      _id: nanoid(),
      accountId: data?.accountId ?? nanoid(),
      accessToken: data?.accessToken ?? undefined,
      refreshToken: data?.refreshToken ?? undefined,
      active: data?.active ?? true,
      expiresIn: data?.expiresIn ?? null,
      canceledAt: data?.canceledAt ?? null,
      updatedAt: data?.updatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now())
    });
  }
}
