import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSInterfaces = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      await toolbox.template.generate({
        template: 'nestjs/src/interfaces/index.ts.ejs',
        target: `${baseProjectSrcPath}/interfaces/index.ts`,
        props: {
          projectName,
          tables
        }
      });
    } catch (error) {
      toolbox.print.error(error);
      return exit(0);
    }
  };
};
