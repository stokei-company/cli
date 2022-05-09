import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSRepositories = async ({
    projectName,
    table
  }: GenerateNestJSConfig) => {
    const { template } = toolbox;

    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      await template.generate({
        template: 'nestjs/src/mappers/index.ts.ejs',
        target: `${baseProjectSrcPath}/mappers/${table.kebabCasePluralName}/index.ts`,
        props: {
          projectName,
          table
        }
      });
    } catch (error) {
      toolbox.print.error(error);
      return exit(0);
    }
  };
};
