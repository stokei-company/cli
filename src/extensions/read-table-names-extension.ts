import { exit } from 'process';
import { Table, TableName } from '../interfaces/tables.interface';
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
          message: 'What is the Entity SINGULAR name?'
        });

        if (!singularName?.trim()?.toLowerCase()) {
          exitCommandTableNames = true;
          continue;
        }

        const { pluralName } = await prompt.ask({
          type: 'input',
          name: 'pluralName',
          message: 'What is the Entity PLURAL name (Opicional)?'
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
        print.error('You canceled the command without entities!');
        return exit(0);
      }
      const tables: Table[] = tableNames.map(({ singularName, pluralName }) =>
        convertString(singularName, pluralName)
      );
      return tables;
    } catch (error) {
      return exit(0);
    }
  };
};
