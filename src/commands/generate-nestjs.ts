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
      /*
      const tables: Table[] = await readTableNames();

      tables.forEach(async (table) => {
        await template.generate({
          template: 'nestjs/src/commands',
          target: `teste/${table.kebabCasePluralName}`
        });
      });
      */

      await toolbox.generateNestJSConfigFiles({ projectName });

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
