import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'generate:query',
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
      target: `queries/${name}-model.ts`,
      props: { name }
    });

    info(`Generated file at queries/${name}-model.ts`);
  }
};
