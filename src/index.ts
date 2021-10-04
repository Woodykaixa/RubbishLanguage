import { getConfig, RubbishLanguageCommandLine } from '@/cli';
const cmd = new RubbishLanguageCommandLine(process.argv);
if (cmd.cliOptions.help) {
  console.log(cmd.version);
  console.log(cmd.help);
  process.exit(0);
}
if (cmd.cliOptions.version) {
  console.log(cmd.version);
  process.exit(0);
}

const projectConfig = getConfig(cmd.cliOptions.project);
