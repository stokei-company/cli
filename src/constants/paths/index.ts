export const getBaseProjectPath = (
  projectName: string,
  isRootRepository?: boolean
) => (isRootRepository ? '.' : projectName);
export const getBaseProjectSrcPath = (
  projectName: string,
  isRootRepository?: boolean
) => getBaseProjectPath(projectName, isRootRepository) + '/src';
export const getBaseProjectTestPath = (
  projectName: string,
  isRootRepository?: boolean
) => getBaseProjectPath(projectName, isRootRepository) + '/test';
export const getBaseProjectGithubWorkflowsPath = (
  projectName: string,
  isRootRepository?: boolean
) => getBaseProjectPath(projectName, isRootRepository) + '/.github/workflows';
