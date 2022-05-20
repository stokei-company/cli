import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSServices = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );
      const templateServicesPath = `nestjs/src/services`;

      const targetServicesPath = `${baseProjectSrcPath}/services`;

      await toolbox.template.generate({
        template: `${templateServicesPath}/index.ts.ejs`,
        target: `${targetServicesPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        const tableTemplateServicesPath = `${templateServicesPath}/kebab-case-plural-name`;

        const tableTargetServicesPath = `${targetServicesPath}/${table.kebabCasePluralName}`;

        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/index.ts.ejs`,
          target: `${tableTargetServicesPath}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/create/index.ts.ejs`,
          target: `${tableTargetServicesPath}/create-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/create/index.spec.ts.ejs`,
          target: `${tableTargetServicesPath}/create-${table.kebabCaseSingularName}/index.spec.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/remove/index.ts.ejs`,
          target: `${tableTargetServicesPath}/remove-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/remove/index.spec.ts.ejs`,
          target: `${tableTargetServicesPath}/remove-${table.kebabCaseSingularName}/index.spec.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/update/index.ts.ejs`,
          target: `${tableTargetServicesPath}/update-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/update/index.spec.ts.ejs`,
          target: `${tableTargetServicesPath}/update-${table.kebabCaseSingularName}/index.spec.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/find-by-id/index.ts.ejs`,
          target: `${tableTargetServicesPath}/find-${table.kebabCaseSingularName}-by-id/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/find-by-id/index.spec.ts.ejs`,
          target: `${tableTargetServicesPath}/find-${table.kebabCaseSingularName}-by-id/index.spec.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/find-all/index.ts.ejs`,
          target: `${tableTargetServicesPath}/find-all-${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${tableTemplateServicesPath}/find-all/index.spec.ts.ejs`,
          target: `${tableTargetServicesPath}/find-all-${table.kebabCasePluralName}/index.spec.ts`,
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
