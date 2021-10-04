export type CliErrorType = 'Argument parsing error' | 'Argument transformation error';

export const cliErrorFormatter = (type: CliErrorType, message: string) => type + ': ' + message;

export class CliError extends Error {
  constructor(type: CliErrorType, message: string) {
    super();
    this.message = cliErrorFormatter(type, message);
    this.name = 'CLI error';
  }
}

export class ProjectConfigError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
