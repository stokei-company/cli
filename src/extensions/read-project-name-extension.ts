import { exit } from 'process';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.readProjectName = async () => {
    const {
      parameters: { first: parametersProjectName },
      prompt,
      print,
      convertString
    } = toolbox;

    try {
      if (parametersProjectName) {
        return convertString(parametersProjectName);
      }
      const { projectName } = await prompt.ask({
        type: 'input',
        name: 'projectName',
        message: 'Qual o nome do projeto?'
      });
      if (!projectName) {
        print.error('Project name not found!');
        return exit(0);
      }
      return convertString(projectName);
    } catch (error) {
      return exit(0);
    }
  };
};
