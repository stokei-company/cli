import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSCommands = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      const commandHandlersPath = 'commands/handlers';
      const commandImplementsPath = 'commands/implements';
      const templateCommandHandlersPath = `nestjs/src/${commandHandlersPath}`;
      const templateCommandImplementsPath = `nestjs/src/${commandImplementsPath}`;
      const templateCommandHandlersTablePath = `${templateCommandHandlersPath}/kebab-case-plural-name`;
      const templateCommandImplementsTablePath = `${templateCommandImplementsPath}/kebab-case-plural-name`;
      await toolbox.template.generate({
        template: `${templateCommandHandlersPath}/index.ts.ejs`,
        target: `${baseProjectSrcPath}/${commandHandlersPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        const tableHandlersPath = `${baseProjectSrcPath}/${commandHandlersPath}/${table.kebabCasePluralName}`;
        const tableImplementsPath = `${baseProjectSrcPath}/${commandImplementsPath}/${table.kebabCasePluralName}`;

        await toolbox.template.generate({
          template: `${templateCommandHandlersTablePath}/index.ts.ejs`,
          target: `${tableHandlersPath}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateCommandHandlersTablePath}/create/index.ts.ejs`,
          target: `${tableHandlersPath}/create-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateCommandHandlersTablePath}/update/index.ts.ejs`,
          target: `${tableHandlersPath}/update-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateCommandHandlersTablePath}/remove/index.ts.ejs`,
          target: `${tableHandlersPath}/remove-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateCommandImplementsTablePath}/create.command.ts.ejs`,
          target: `${tableImplementsPath}/create-${table.kebabCaseSingularName}.command.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateCommandImplementsTablePath}/update.command.ts.ejs`,
          target: `${tableImplementsPath}/update-${table.kebabCaseSingularName}.command.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateCommandImplementsTablePath}/remove.command.ts.ejs`,
          target: `${tableImplementsPath}/remove-${table.kebabCaseSingularName}.command.ts`,
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
