import { StringConverted } from './strings.interface';

export type ProjectName = StringConverted;

export interface ReadProjectName {
  isRootRepository: boolean;
  projectName: StringConverted;
}
