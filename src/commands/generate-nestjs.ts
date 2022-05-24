import { GluegunCommand } from 'gluegun';
import { exit } from 'process';
import { Toolbox } from '../interfaces/toolbox.interface';

const command: GluegunCommand = {
  name: 'generate:nestjs',
  alias: ['gnestjs', 'gn'],
  description:
    'Comando para gerar um crud de um Microserviço com o padrão CQRS em NestJS',
  run: async (toolbox: Toolbox) => {
    try {
      const projectName = await toolbox.readProjectName();
      if (!projectName) {
        toolbox.print.error('Nome do projeto não encontrado!');
        return exit(0);
      }
      const tables = await toolbox.readTableNames();

      const timer = toolbox.system.startTimer();

      toolbox.print.info('Criando arquivos...');
      await toolbox.generateProjectFolder({ projectName, tables });
      await toolbox.generateNestJSConfigFiles({ projectName, tables });
      await toolbox.generateNestJSCommands({ projectName, tables });
      await toolbox.generateNestJSControllers({ projectName, tables });
      await toolbox.generateNestJSDatabese({ projectName, tables });
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

      const timeInSeconds = (timer() / 1000).toFixed(2);
      toolbox.print.success(`Command finished in ${timeInSeconds}s!`);
    } catch (error) {
      toolbox.print.error(error.message);
      toolbox.print.error('An error ocurred!');
    }
  }
};

module.exports = command;
