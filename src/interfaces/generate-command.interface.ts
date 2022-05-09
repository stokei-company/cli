import { ProjectName } from './project.interface';
import { Table } from './tables.interface';

export interface GenerateNestJSConfig {
  projectName: ProjectName;
  table?: Table;
}

export interface GenerateNestJSDatabaseConfig {
  projectName: ProjectName;
  tables: Table[];
}
