import { exit } from 'process';
import { resolve, basename } from 'path';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.readProjectName = async () => {
    const {
      parameters: {
        first: parametersSingularProjectName,
        options: { plural: parametersPluralProjectName }
      },
      prompt,
      print,
      convertString
    } = toolbox;

    try {
      const pathname = basename(resolve('.'));
      const isRootRepository = await prompt.confirm(
        `Install in root folder (${pathname})?`
      );
      if (parametersSingularProjectName) {
        return {
          isRootRepository,
          projectName: convertString(
            parametersSingularProjectName,
            parametersPluralProjectName
          )
        };
      }
      const { projectName } = await prompt.ask({
        type: 'input',
        name: 'projectName',
        message: 'What is the project name?'
      });
      if (!projectName) {
        print.error('Project name not found!');
        return exit(0);
      }
      return {
        isRootRepository,
        projectName: convertString(projectName, parametersPluralProjectName)
      };
    } catch (error) {
      return exit(0);
    }
  };
};
