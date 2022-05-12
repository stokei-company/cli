import { GluegunCommand } from 'gluegun';
import { exit } from 'process';
import { Toolbox } from '../interfaces/toolbox.interface';

const command: GluegunCommand = {
  name: 'generate:nestjs',
  alias: ['gnestjs'],
  run: async (toolbox: Toolbox) => {
    try {
      const projectName = await toolbox.readProjectName();
      if (!projectName) {
        toolbox.print.error('Project name not found!');
        return exit(0);
      }
      const tables = await toolbox.readTableNames();

      await toolbox.generateNestJSConfigFiles({ projectName, tables });
      await toolbox.generateNestJSCommands({ projectName, tables });
      await toolbox.generateNestJSControllers({ projectName, tables });
      await toolbox.generateNestJSDatabese({ projectName, tables });
      /*
      await toolbox.generateNestJSDTOs({ projectName, tables });
      await toolbox.generateNestJSEntities({ projectName, tables });
      await toolbox.generateNestJSEnums({ projectName, tables });
      await toolbox.generateNestJSEnvironments({ projectName, tables });
      await toolbox.generateNestJSErrors({ projectName, tables });
      await toolbox.generateNestJSEvents({ projectName, tables });
      await toolbox.generateNestJSInterfaces({ projectName, tables });
      await toolbox.generateNestJSMappers({ projectName, tables });
      await toolbox.generateNestJSMocks({ projectName, tables });
      await toolbox.generateNestJSModels({ projectName, tables });
      await toolbox.generateNestJSQueries({ projectName, tables });
      await toolbox.generateNestJSRepositories({ projectName, tables });
      await toolbox.generateNestJSSagas({ projectName, tables });
      await toolbox.generateNestJSServices({ projectName, tables });

      /*
      toolbox.print.info('Installing dependencies...');
      await toolbox.system.exec('npm i');

      toolbox.print.info('Formatting code...');
      await toolbox.system.exec('npm run format');
      await toolbox.system.exec('npm run lint');
      */
      toolbox.print.success('Command is finished!');
    } catch (error) {
      toolbox.print.error('Ocorreu um erro com na execução do comando!');
    }
  }
};

module.exports = command;
