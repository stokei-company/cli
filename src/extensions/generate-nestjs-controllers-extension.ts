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
      const templateControllersGraphQLTypesPath = `${templateControllersGraphQLPath}/types`;

      const targetControllersPath = `${baseProjectSrcPath}/controllers`;
      const targetControllersGraphQLPath = `${targetControllersPath}/graphql`;
      const targetControllersGraphQLDatalodersPath = `${targetControllersGraphQLPath}/dataloaders`;
      const targetControllersGraphQLEnumsPath = `${targetControllersGraphQLPath}/enums`;
      const targetControllersGraphQLInputsPath = `${targetControllersGraphQLPath}/inputs`;
      const targetControllersGraphQLResolversPath = `${targetControllersGraphQLPath}/resolvers`;
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

      tables.forEach(async (table) => {
        await toolbox.template.generate({
          template: `${templateControllersGraphQLDatalodersPath}/kebab-case-plural-name.ts.ejs`,
          target: `${targetControllersGraphQLDatalodersPath}/${table.kebabCasePluralName}.ts`,
          props: {
            projectName,
            table
          }
        });

        await toolbox.template.generate({
          template: `${templateControllersGraphQLTypesPath}/kebab-case-singular-name.ts.ejs`,
          target: `${targetControllersGraphQLTypesPath}/${table.kebabCasePluralName}.ts`,
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
