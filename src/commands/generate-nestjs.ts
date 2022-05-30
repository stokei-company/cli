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
      const { projectName, isRootRepository } = await toolbox.readProjectName();
      if (!projectName) {
        toolbox.print.error('Nome do projeto não encontrado!');
        return exit(0);
      }
      const tables = await toolbox.readTableNames();

      const timer = toolbox.system.startTimer();

      toolbox.print.info('Criando arquivos...');
      await toolbox.generateNestJSConfigFiles({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSCommands({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSControllers({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSDatabese({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSDTOs({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSEntities({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSEnums({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSEnvironments({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSErrors({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSEvents({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSInterfaces({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSMappers({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSMocks({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSModels({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSQueries({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSRepositories({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSSagas({
        isRootRepository,
        projectName,
        tables
      });
      await toolbox.generateNestJSServices({
        isRootRepository,
        projectName,
        tables
      });

      const timeInSeconds = (timer() / 1000).toFixed(2);
      toolbox.print.success(`Command finished in ${timeInSeconds}s!`);
    } catch (error) {
      toolbox.print.error(error.message);
      toolbox.print.error('An error ocurred!');
    }
  }
};

module.exports = command;
