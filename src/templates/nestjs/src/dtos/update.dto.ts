export interface IUpdateDataDTO {
  updatedAt?: string;
}

export interface IUpdateWhereDTO {
  id: string;
}

export interface IUpdateDTO {
  data: IUpdateDataDTO;
  where: IUpdateWhereDTO;
}
