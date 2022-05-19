import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSErrors = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      await toolbox.template.generate({
        template: 'nestjs/src/errors/index.ts.ejs',
        target: `${baseProjectSrcPath}/errors/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/src/errors/data-not-found/index.ts.ejs',
        target: `${baseProjectSrcPath}/errors/data-not-found/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/src/errors/param-not-found/index.ts.ejs',
        target: `${baseProjectSrcPath}/errors/param-not-found/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template:
            'nestjs/src/errors/kebab-case-singular-name-not-found/index.ts.ejs',
          target: `${baseProjectSrcPath}/errors/${table.kebabCaseSingularName}-not-found/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template:
            'nestjs/src/errors/kebab-case-plural-name-not-found/index.ts.ejs',
          target: `${baseProjectSrcPath}/errors/${table.kebabCasePluralName}-not-found/index.ts`,
          props: {
            projectName,
            table
          }
        });
      });
    } catch (error) {
      toolbox.print.error(error);
      return exit(0);
    }
  };
};
