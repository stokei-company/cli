import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSQueries = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      const templateQueriesPath = `nestjs/src/queries`;
      const templateQueriesHandlersPath = `${templateQueriesPath}/handlers`;
      const templateQueriesImplementsPath = `${templateQueriesPath}/implements`;

      const targetQueriesPath = `${baseProjectSrcPath}/queries`;
      const targetQueriesHandlersPath = `${targetQueriesPath}/handlers`;
      const targetQueriesImplementsPath = `${targetQueriesPath}/implements`;

      await toolbox.template.generate({
        template: `${templateQueriesHandlersPath}/index.ts.ejs`,
        target: `${targetQueriesHandlersPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: `${templateQueriesHandlersPath}/kebab-case-plural-name/index.ts.ejs`,
          target: `${targetQueriesHandlersPath}/${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateQueriesHandlersPath}/kebab-case-plural-name/find-by-id/index.ts.ejs`,
          target: `${targetQueriesHandlersPath}/${table.kebabCasePluralName}/find-${table.kebabCaseSingularName}-by-id/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateQueriesHandlersPath}/kebab-case-plural-name/find-by-id/index.spec.ts.ejs`,
          target: `${targetQueriesHandlersPath}/${table.kebabCasePluralName}/find-${table.kebabCaseSingularName}-by-id/index.spec.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateQueriesHandlersPath}/kebab-case-plural-name/find-all/index.ts.ejs`,
          target: `${targetQueriesHandlersPath}/${table.kebabCasePluralName}/find-all-${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateQueriesHandlersPath}/kebab-case-plural-name/find-all/index.spec.ts.ejs`,
          target: `${targetQueriesHandlersPath}/${table.kebabCasePluralName}/find-all-${table.kebabCasePluralName}/index.spec.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateQueriesImplementsPath}/find-by-id.query.ts.ejs`,
          target: `${targetQueriesImplementsPath}/${table.kebabCasePluralName}/find-${table.kebabCaseSingularName}-by-id.query.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateQueriesImplementsPath}/find-all.query.ts.ejs`,
          target: `${targetQueriesImplementsPath}/${table.kebabCasePluralName}/find-all-${table.kebabCasePluralName}.query.ts`,
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
