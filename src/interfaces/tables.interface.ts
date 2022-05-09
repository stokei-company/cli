import { StringConverted } from './strings.interface';

export interface TableName {
  singularName: string;
  pluralName: string;
}

export type Table = StringConverted;
