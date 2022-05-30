import { exit } from 'process';
import {
  getBaseProjectGithubWorkflowsPath,
  getBaseProjectPath,
  getBaseProjectSrcPath,
  getBaseProjectTestPath
} from '../constants/paths';
import { GenerateNestJSConfig } from '../interfaces/generate-command.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.generateNestJSConfigFiles = async ({
    projectName,
    isRootRepository
  }: GenerateNestJSConfig) => {
    try {
      const baseProjectPath = getBaseProjectPath(
        projectName.kebabCasePluralName,
        isRootRepository
      );
      const baseProjectTestPath = getBaseProjectTestPath(
        projectName.kebabCasePluralName,
        isRootRepository
      );
      const baseProjectSrcPath = getBaseProjectSrcPath(
        projectName.kebabCasePluralName,
        isRootRepository
      );
      const baseProjectGithubWorkgflowsPath = getBaseProjectGithubWorkflowsPath(
        projectName.kebabCasePluralName,
        isRootRepository
      );

      await toolbox.template.generate({
        template: 'nestjs/.editorconfig.ejs',
        target: `${baseProjectPath}/.editorconfig`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/.env.example.ejs',
        target: `${baseProjectPath}/.env.example`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/.eslintrc.js.ejs',
        target: `${baseProjectPath}/.eslintrc.js`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/.gitignore.ejs',
        target: `${baseProjectPath}/.gitignore`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/.prettierrc.ejs',
        target: `${baseProjectPath}/.prettierrc`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/docker-compose.yml.ejs',
        target: `${baseProjectPath}/docker-compose.yml`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/Dockerfile.ejs',
        target: `${baseProjectPath}/Dockerfile`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/nest-cli.json.ejs',
        target: `${baseProjectPath}/nest-cli.json`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/package.json.ejs',
        target: `${baseProjectPath}/package.json`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/README.md.ejs',
        target: `${baseProjectPath}/README.md`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/stokei.code-workspace.ejs',
        target: `${baseProjectPath}/${projectName.kebabCasePluralName}-service.code-workspace`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/tsconfig.build.json.ejs',
        target: `${baseProjectPath}/tsconfig.build.json`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/tsconfig.json.ejs',
        target: `${baseProjectPath}/tsconfig.json`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/tsconfig.json.ejs',
        target: `${baseProjectPath}/tsconfig.json`,
        props: {
          projectName
        }
      });

      await toolbox.template.generate({
        template: 'nestjs/src/main.module.ts.ejs',
        target: `${baseProjectSrcPath}/main.module.ts`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/src/main.ts.ejs',
        target: `${baseProjectSrcPath}/main.ts`,
        props: {
          projectName
        }
      });

      await toolbox.template.generate({
        template: 'nestjs/.github/workflows/main.yml.ejs',
        target: `${baseProjectGithubWorkgflowsPath}/main.yml`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/.github/workflows/release.yml.ejs',
        target: `${baseProjectGithubWorkgflowsPath}/release.yml`,
        props: {
          projectName
        }
      });

      await toolbox.template.generate({
        template: 'nestjs/test/app.e2e-spec.ts.ejs',
        target: `${baseProjectTestPath}/app.e2e-spec.ts`,
        props: {
          projectName
        }
      });
      await toolbox.template.generate({
        template: 'nestjs/test/jest-e2e.json.ejs',
        target: `${baseProjectTestPath}/jest-e2e.json`,
        props: {
          projectName
        }
      });
    } catch (error) {
      toolbox.print.error(error?.message);
      return exit(0);
    }
  };
};
