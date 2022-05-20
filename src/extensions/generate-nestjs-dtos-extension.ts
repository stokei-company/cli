import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSDTOs = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: 'nestjs/src/dtos/count.dto.ts.ejs',
          target: `${baseProjectSrcPath}/dtos/${table.kebabCasePluralName}/count-${table.kebabCasePluralName}.dto.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: 'nestjs/src/dtos/create.dto.ts.ejs',
          target: `${baseProjectSrcPath}/dtos/${table.kebabCasePluralName}/create-${table.kebabCaseSingularName}.dto.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: 'nestjs/src/dtos/exists.dto.ts.ejs',
          target: `${baseProjectSrcPath}/dtos/${table.kebabCasePluralName}/exists-${table.kebabCasePluralName}.dto.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: 'nestjs/src/dtos/find-all.dto.ts.ejs',
          target: `${baseProjectSrcPath}/dtos/${table.kebabCasePluralName}/find-all-${table.kebabCasePluralName}.dto.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: 'nestjs/src/dtos/update.dto.ts.ejs',
          target: `${baseProjectSrcPath}/dtos/${table.kebabCasePluralName}/update-${table.kebabCaseSingularName}.dto.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: 'nestjs/src/dtos/remove.dto.ts.ejs',
          target: `${baseProjectSrcPath}/dtos/${table.kebabCasePluralName}/remove-${table.kebabCaseSingularName}.dto.ts`,
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
