import { DeepPartial } from '@/common/type';

/**
 * Available features for a project.
 */
export interface RubbishLanguageFeatureSet {
  /** Syntax */
  core: true;

  /** Emit runtime in production */
  runtime: boolean;

  /** Generate byte code instead of assembly, so that you can run RubbishLanguage projects via a interpreter */
  script: boolean;
}

/**
 * Configuration of RubbishLanguage projects.
 */
export interface ProjectConfiguration {
  /** The name of your project */
  project: string;
  /** The entry of your project, where compiler starts compiling */
  entry: string;

  /** The enabled features for a project. */
  features: RubbishLanguageFeatureSet;
}

export type ProjectConfigurationFileContent = DeepPartial<ProjectConfiguration>;
