import { exit } from 'process';
import { getBaseProjectSrcPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSControllers = async ({
    projectName,
    tables
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName
      );

      const templateControllersPath = 'nestjs/src/controllers';
      const templateControllersGraphQLPath = `${templateControllersPath}/graphql`;
      const templateControllersGraphQLDatalodersPath = `${templateControllersGraphQLPath}/dataloaders`;
      const templateControllersGraphQLEnumsPath = `${templateControllersGraphQLPath}/enums`;
      const templateControllersGraphQLInputsPath = `${templateControllersGraphQLPath}/inputs`;
      const templateControllersGraphQLResolversPath = `${templateControllersGraphQLPath}/resolvers`;
      const templateControllersGraphQLResolversFieldsPath = `${templateControllersGraphQLResolversPath}/fields`;
      const templateControllersGraphQLResolversMutationsPath = `${templateControllersGraphQLResolversPath}/mutations`;
      const templateControllersGraphQLResolversQueriesPath = `${templateControllersGraphQLResolversPath}/queries`;
      const templateControllersGraphQLResolversSubscriptionsPath = `${templateControllersGraphQLResolversPath}/subscriptions`;
      const templateControllersGraphQLTypesPath = `${templateControllersGraphQLPath}/types`;

      const targetControllersPath = `${baseProjectSrcPath}/controllers`;
      const targetControllersGraphQLPath = `${targetControllersPath}/graphql`;
      const targetControllersGraphQLDatalodersPath = `${targetControllersGraphQLPath}/dataloaders`;
      const targetControllersGraphQLEnumsPath = `${targetControllersGraphQLPath}/enums`;
      const targetControllersGraphQLInputsPath = `${targetControllersGraphQLPath}/inputs`;
      const targetControllersGraphQLResolversPath = `${targetControllersGraphQLPath}/resolvers`;
      const targetControllersGraphQLResolversFieldsPath = `${targetControllersGraphQLResolversPath}/fields`;
      const targetControllersGraphQLResolversMutationsPath = `${targetControllersGraphQLResolversPath}/mutations`;
      const targetControllersGraphQLResolversQueriesPath = `${targetControllersGraphQLResolversPath}/queries`;
      const targetControllersGraphQLResolversSubscriptionsPath = `${targetControllersGraphQLResolversPath}/subscriptions`;
      const targetControllersGraphQLTypesPath = `${targetControllersGraphQLPath}/types`;

      await toolbox.template.generate({
        template: `${templateControllersPath}/index.ts.ejs`,
        target: `${targetControllersPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLDatalodersPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLDatalodersPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLResolversPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLResolversPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLResolversFieldsPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLResolversFieldsPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLResolversMutationsPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLResolversMutationsPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLResolversQueriesPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLResolversQueriesPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });
      await toolbox.template.generate({
        template: `${templateControllersGraphQLResolversSubscriptionsPath}/index.ts.ejs`,
        target: `${targetControllersGraphQLResolversSubscriptionsPath}/index.ts`,
        props: {
          projectName,
          tables
        }
      });

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: `${templateControllersGraphQLDatalodersPath}/kebab-case-plural-name.loader.ts.ejs`,
          target: `${targetControllersGraphQLDatalodersPath}/${table.kebabCasePluralName}.loader.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLEnumsPath}/enum.ts.ejs`,
          target: `${targetControllersGraphQLEnumsPath}/${table.kebabCasePluralName}/my-enum.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLInputsPath}/create.input.ts.ejs`,
          target: `${targetControllersGraphQLInputsPath}/${table.kebabCasePluralName}/create-${table.kebabCaseSingularName}.input.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLInputsPath}/update.input.ts.ejs`,
          target: `${targetControllersGraphQLInputsPath}/${table.kebabCasePluralName}/update-${table.kebabCaseSingularName}.input.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLInputsPath}/remove.input.ts.ejs`,
          target: `${targetControllersGraphQLInputsPath}/${table.kebabCasePluralName}/remove-${table.kebabCaseSingularName}.input.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversFieldsPath}/kebab-case-plural-name/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversFieldsPath}/${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversFieldsPath}/kebab-case-plural-name/reference/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversFieldsPath}/${table.kebabCasePluralName}/reference/index.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversMutationsPath}/kebab-case-plural-name/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversMutationsPath}/${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversMutationsPath}/kebab-case-plural-name/create/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversMutationsPath}/${table.kebabCasePluralName}/create-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversMutationsPath}/kebab-case-plural-name/remove/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversMutationsPath}/${table.kebabCasePluralName}/remove-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversMutationsPath}/kebab-case-plural-name/update/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversMutationsPath}/${table.kebabCasePluralName}/update-${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversQueriesPath}/kebab-case-plural-name/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversQueriesPath}/${table.kebabCasePluralName}/index.ts`,
          props: {
            projectName,
            table
          }
        });
        await toolbox.template.generate({
          template: `${templateControllersGraphQLResolversQueriesPath}/kebab-case-plural-name/kebab-case-singular-name/index.ts.ejs`,
          target: `${targetControllersGraphQLResolversQueriesPath}/${table.kebabCasePluralName}/${table.kebabCaseSingularName}/index.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLTypesPath}/kebab-case-singular-name.ts.ejs`,
          target: `${targetControllersGraphQLTypesPath}/${table.kebabCaseSingularName}.ts`,
          props: {
            projectName,
            table
          }
        });
      });
    } catch (error) {
      toolbox.print.error(error);
      return exit(0);
    }
  };
};
