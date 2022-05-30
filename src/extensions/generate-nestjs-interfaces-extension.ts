import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSInterfaces = async ({
    projectName,
    isRootRepository,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName,
        isRootRepository
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
      toolbox.print.error(error?.message);
      return exit(0);
    }
  };
};
