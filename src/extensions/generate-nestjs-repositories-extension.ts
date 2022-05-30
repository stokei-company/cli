import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSRepositories = async ({
    projectName,
    isRootRepository,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName,
        isRootRepository
      );
      const templateRepositoriesPath = `nestjs/src/repositories`;

      const targetRepositoriesPath = `${baseProjectSrcPath}/repositories`;

      await toolbox.template.generate({
        template: `${templateRepositoriesPath}/index.ts.ejs`,
        target: `${targetRepositoriesPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        const tableTemplateRepositoriesPath = `${templateRepositoriesPath}/kebab-case-plural-name`;

        const tableTargetRepositoriesPath = `${targetRepositoriesPath}/${table.kebabCasePluralName}`;

        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/count/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/count-${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/create/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/create-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/exists/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/exists-${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/find-all/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/find-all-${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/find-by-id/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/find-${table.kebabCaseSingularName}-by-id/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/remove/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/remove-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateRepositoriesPath}/update/index.ts.ejs`,
          target: `${tableTargetRepositoriesPath}/update-${table.kebabCaseSingularName}/index.ts`,
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
