import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSModels = async ({
    projectName,
    isRootRepository,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName,
        isRootRepository
      );

      const templateModelsPath = `nestjs/src/models`;

      const targetModelsPath = `${baseProjectSrcPath}/models`;

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: `${templateModelsPath}/model.ts.ejs`,
          target: `${targetModelsPath}/${table.kebabCaseSingularName}.model.ts`,
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
