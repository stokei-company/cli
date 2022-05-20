import { GluegunToolbox } from 'gluegun';
import { GenerateNestJSConfig } from './generate-command.interface';
import { StringConverted } from './strings.interface';
import { Table } from './tables.interface';

export interface Toolbox extends GluegunToolbox {
  readProjectName: () => Promise<StringConverted>;
  readTableNames: () => Promise<Table[]>;
  convertString: (singular: string, plural?: string) => StringConverted;
  generateProjectFolder: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSConfigFiles: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSCommands: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSControllers: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSDatabese: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSDTOs: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSEntities: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSEnums: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSEnvironments: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSErrors: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSEvents: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSInterfaces: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSMappers: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSMocks: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSModels: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSQueries: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSRepositories: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSSagas: (data: GenerateNestJSConfig) => Promise<void>;
  generateNestJSServices: (data: GenerateNestJSConfig) => Promise<void>;
}
