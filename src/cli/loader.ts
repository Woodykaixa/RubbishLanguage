import { ProjectConfigError } from '@/common/error';
import { ProjectConfiguration, ProjectConfigurationFileContent } from '@/project/types';
import fs from 'fs';

function checkNecessaryConfig(config: ProjectConfigurationFileContent) {
  if (!config.entry) {
    throw new ProjectConfigError(`missing field 'entry' in your configuration`);
  }
  if (!config.project) {
    throw new ProjectConfigError(`missing field 'project' in your configuration`);
  }
}

export function getConfig(path: string): ProjectConfiguration {
  const config = JSON.parse(fs.readFileSync(path).toString('utf-8'));
  checkNecessaryConfig(config);
  return {
    entry: config.entry!,
    project: config.project!,
    features: {
      runtime: false,
      script: false,
      ...config!.features,
      core: true,
    },
  };
}
