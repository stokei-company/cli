export interface IRefreshAccessMapperData {
  accessId: string;
}

export type IRefreshAccessMapperResponse = IRefreshAccessMapperData;

export const refreshAccessMapper = (
  data: IRefreshAccessMapperData
): IRefreshAccessMapperResponse => ({
  accessId: data.accessId
});
