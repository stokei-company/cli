import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSEntities = async ({
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
        template: 'nestjs/src/entities/index.ts.ejs',
        target: `${baseProjectSrcPath}/entities/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: 'nestjs/src/entities/entity.ts.ejs',
          target: `${baseProjectSrcPath}/entities/${table.kebabCaseSingularName}.entity.ts`,
          props: {
            projectName,
            table
          }
        });
      });
    } catch (error) {
      toolbox.print.error(error?.message);
      return exit(0);
    }
  };
};
