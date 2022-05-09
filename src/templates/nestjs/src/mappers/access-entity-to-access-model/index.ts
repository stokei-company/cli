import { AccessEntity } from '@stokei/services/accounts/entities';
import { AccessModel } from '@stokei/services/accounts/models/access.model';
import { convertToISODateString } from '@stokei/shared';

export const mapOneAccessEntityToAccessModel = (access: AccessEntity) =>
  access &&
  new AccessModel({
    ...access,
    expiresIn: convertToISODateString(access.expiresIn),
    canceledAt: convertToISODateString(access.canceledAt),
    updatedAt: convertToISODateString(access.updatedAt),
    createdAt: convertToISODateString(access.createdAt)
  });

export const mapManyAccessEntityToAccessModel = (accesses: AccessEntity[]) =>
  accesses?.length > 0
    ? accesses?.map(mapOneAccessEntityToAccessModel).filter(Boolean)
    : [];
