import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindByIdsDTO {
  ids?: string[];
  parent?: IWhereData;
}
export type IKeysWhereDataFindByIdsDTO = keyof WhereDataFindByIdsDTO;

export interface OrderByDataFindByIdsDTO {
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindByIdsDTO = keyof OrderByDataFindByIdsDTO;

export type FindByIdsDTO = IBaseFindManyDTO<
  WhereDataFindByIdsDTO,
  OrderByDataFindByIdsDTO
>;
