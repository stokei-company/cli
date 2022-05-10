import { ProjectName } from './project.interface';
import { Table } from './tables.interface';

export interface GenerateNestJSConfig {
  projectName: ProjectName;
  tables: Table[];
}
