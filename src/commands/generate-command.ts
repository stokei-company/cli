import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'generate:command',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info }
    } = toolbox;

    const name = parameters.first;

    await generate({
      template: 'model.ts.ejs',
      target: `commands/${name}-model.ts`,
      props: { name }
    });

    info(`Generated file at commands/${name}-model.ts`);
  }
};
