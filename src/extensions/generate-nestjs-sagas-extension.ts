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

      const templateSagasPath = `nestjs/src/sagas`;

      const targetSagasPath = `${baseProjectSrcPath}/sagas`;

      await toolbox.template.generate({
        template: `${templateSagasPath}/index.ts.ejs`,
        target: `${targetSagasPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: `${templateSagasPath}/saga.ts.ejs`,
          target: `${targetSagasPath}/${table.kebabCasePluralName}.saga.ts`,
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
