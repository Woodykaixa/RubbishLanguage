import pkg from '../../package.json';
import { CommandLineParser } from './parser';
interface RubbishLanguageCliOptions {
  project: string;
  help: boolean;
  version: boolean;
}

export class RubbishLanguageCommandLine {
  private _cliOptions: RubbishLanguageCliOptions;
  private _parser: CommandLineParser<RubbishLanguageCliOptions>;
  readonly version = 'RubbishLanguage CommandLine version: ' + pkg.version;
  constructor(args: string[]) {
    this._parser = new CommandLineParser<RubbishLanguageCliOptions>({
      project: {
        typename: 'string',
        alias: ['p'],
        nullable: false,
        description: 'Path to RubbishLanguage configuration file',
        default: 'rub.config.json',
        transformer: null,
      },
      help: {
        typename: 'boolean',
        alias: ['h'],
        description: 'Get help of RubbishLanguage',
      },
      version: {
        typename: 'boolean',
        alias: ['v'],
        description: 'Get version of RubbishLanguage',
      },
    });
    this._cliOptions = this._parser.parse(args);
  }

  get cliOptions() {
    return this._cliOptions;
  }

  get help() {
    return this._parser.getDescriptions();
  }
}
