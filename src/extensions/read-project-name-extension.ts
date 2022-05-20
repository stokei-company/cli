import { exit } from 'process';
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
      if (parametersSingularProjectName) {
        return convertString(
          parametersSingularProjectName,
          parametersPluralProjectName
        );
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
      return convertString(projectName, parametersPluralProjectName);
    } catch (error) {
      return exit(0);
    }
  };
};
