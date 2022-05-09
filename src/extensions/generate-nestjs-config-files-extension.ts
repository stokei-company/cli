import { exit } from 'process';
import { getBaseProjectPath } from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSConfigFiles = async ({
    projectName
  }: GenerateNestJSConfig) => {
    const { template } = toolbox;

    try {
      const baseProjectPath = getBaseProjectPath(
        projectName.kebabCasePluralName
      );

      await template.generate({
        template: 'nestjs/.editorconfig.ejs',
        target: `${baseProjectPath}/.editorconfig`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/.env.example.ejs',
        target: `${baseProjectPath}/.env.example`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/.eslintrc.js.ejs',
        target: `${baseProjectPath}/.eslintrc.js`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/.gitignore.ejs',
        target: `${baseProjectPath}/.gitignore`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/.prettierrc.ejs',
        target: `${baseProjectPath}/.prettierrc`,
        props: {
          projectName
        }
      });
      console.log({ projectName });
      await template.generate({
        template: 'nestjs/docker-compose.yml.ejs',
        target: `${baseProjectPath}/docker-compose.yml`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/Dockerfile.ejs',
        target: `${baseProjectPath}/Dockerfile`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/nest-cli.json.ejs',
        target: `${baseProjectPath}/nest-cli.json`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/package.json.ejs',
        target: `${baseProjectPath}/package.json`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/README.md.ejs',
        target: `${baseProjectPath}/README.md`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/stokei.code-workspace.ejs',
        target: `${baseProjectPath}/${projectName.kebabCasePluralName}-service.code-workspace`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/tsconfig.build.json.ejs',
        target: `${baseProjectPath}/tsconfig.build.json`,
        props: {
          projectName
        }
      });
      await template.generate({
        template: 'nestjs/tsconfig.json.ejs',
        target: `${baseProjectPath}/tsconfig.json`,
        props: {
          projectName
        }
      });
    } catch (error) {
      toolbox.print.error(error);
      return exit(0);
    }
  };
};
