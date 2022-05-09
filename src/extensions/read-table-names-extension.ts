import { exit } from 'process';
import { TableName } from '../interfaces/tables.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.readTableNames = async () => {
    const { print, prompt, strings, convertString } = toolbox;

    try {
      let exitCommandTableNames = false;
      let tableNames: TableName[] = [];

      while (!exitCommandTableNames) {
        const { singularName } = await prompt.ask({
          type: 'input',
          name: 'singularName',
          message:
            'Qual o nome da tabela no SINGULAR? ("exit" para sair/continuar)'
        });

        if (singularName.toLowerCase() === 'exit') {
          exitCommandTableNames = true;
          continue;
        }

        const { pluralName } = await prompt.ask({
          type: 'input',
          name: 'pluralName',
          message: 'Qual o nome da tabela no PLURAL (Opicional)?'
        });
        if (singularName) {
          tableNames = [
            ...tableNames,
            {
              singularName,
              pluralName: pluralName || strings.plural(singularName)
            }
          ];
        }
        print.info('-------');
      }

      if (!tableNames?.length) {
        print.error('Você cancelou o comando sem nenhuma tabela!');
        return exit(0);
      }
      const tables = tableNames.map(({ singularName, pluralName }) =>
        convertString(singularName, pluralName)
      );
      return tables;
    } catch (error) {
      return exit(0);
    }
  };
};
