import { exit } from 'process';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateProjectFolder = async ({
    projectName
  }: GenerateNestJSConfig) => {
    try {
      await toolbox.system.run('mkdir ' + projectName.kebabCasePluralName);
    } catch (error) {
      toolbox.print.error(error?.message);
      return exit(0);
    }
  };
};
