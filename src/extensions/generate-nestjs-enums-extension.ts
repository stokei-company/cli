import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSEnums = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      await toolbox.template.generate({
        template: 'nestjs/src/enums/server-id-prefix.enum.ts.ejs',
        target: `${baseProjectSrcPath}/enums/server-id-prefix.enum.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/src/enums/server-info.enum.ts.ejs',
        target: `${baseProjectSrcPath}/enums/server-info.enum.ts`,
        props: {
          projectName,
          tables
        }
      });
    } catch (error) {
      toolbox.print.error(error?.message);
      return exit(0);
    }
  };
};
