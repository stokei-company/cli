import { ProjectName } from './project.interface';
import { Table } from './tables.interface';

export interface GenerateNestJSConfig {
  isRootRepository: boolean;
  projectName: ProjectName;
  tables: Table[];
}
