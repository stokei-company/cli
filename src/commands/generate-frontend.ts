import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'generate:frontend',
  run: async (toolbox) => {
    const { print } = toolbox;

    print.error('Command is not working!');
  }
};

module.exports = command;
