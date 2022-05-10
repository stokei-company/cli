import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSServices = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      tables.forEach(async (table) => {
        toolbox.print.success(
          'Table' + baseProjectSrcPath + table.camelCasePluralName
        );
      });
    } catch (error) {
      toolbox.print.error(error);
      return exit(0);
    }
  };
};
