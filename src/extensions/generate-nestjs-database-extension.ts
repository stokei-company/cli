import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSDatabese = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      await toolbox.template.generate({
        template: 'nestjs/src/database/database.module.ts.ejs',
        target: `${baseProjectSrcPath}/database/database.module.ts`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/src/database/prisma/client/index.ts.ejs',
        target: `${baseProjectSrcPath}/database/prisma/client/index.ts`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/src/database/prisma/schema.prisma.ejs',
        target: `${baseProjectSrcPath}/database/prisma/schema.prisma`,
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
