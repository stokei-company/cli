import { GluegunCommand } from 'gluegun';
import { Toolbox } from '../interfaces/toolbox.interface';

const command: GluegunCommand = {
  name: 'generate:frontend',
  alias: ['gfront'],
  run: async (toolbox: Toolbox) => {
    const { print } = toolbox;

    print.error('Command is not working!');
  }
};

module.exports = command;
