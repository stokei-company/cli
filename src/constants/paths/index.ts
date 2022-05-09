export const getBaseProjectPath = (projectName: string) => projectName;
export const getBaseProjectSrcPath = (projectName: string) =>
  projectName + '/src';
export const getBaseProjectTestPath = (projectName: string) =>
  projectName + '/test';
export const getBaseProjectGithubWorkflowsPath = (projectName: string) =>
  projectName + '/.github/workflows';
