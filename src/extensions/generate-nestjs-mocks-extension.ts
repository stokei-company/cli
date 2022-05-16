import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSMocks = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      const templateMocksPath = 'nestjs/src/mocks';
      const templateMockModelsPath = `${templateMocksPath}/models`;

      const targetMocksPath = `${baseProjectSrcPath}/mocks`;
      const targetMockModelsPath = `${targetMocksPath}/models`;

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: `${templateMockModelsPath}/model.mock.ts.ejs`,
          target: `${targetMockModelsPath}/${table.kebabCaseSingularName}.mock.ts`,
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
