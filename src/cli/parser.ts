import { CommandLineOption } from '@/cli';
import type { Nullable, PrimitiveTypeName, Ref } from '@/common/type';
import { ref } from '@/common/helper';
import { CliError } from '@/common/error';

export class CommandLineParser<TParserOutput extends Record<string, any>> {
  private _options: CommandLineOption<TParserOutput>;
  /** Map main name and abbreviation name (both with dashed ) to option main name. */
  private _optionMapping: Map<string, keyof typeof this._options>;
  /**
   * Store unparsed options. `unparsed` means this options didn't appeared in command line.
   * It doesn't means error.
   */
  private _unparsedList: Set<keyof TParserOutput>;

  constructor(options: CommandLineOption<TParserOutput>) {
    this._options = options;
    this._optionMapping = new Map();
    this._unparsedList = new Set();
    this.createOptionMapping();
    this.createUnparsedList();
  }

  /**
   * Map main name and abbreviation name (both with dashed ) to option main name.
   *
   * e.g.  For a option with main field `'example'` and alias field `['e']`, this function generates the following
   * object.
   *
   * ``` js
   * {
   *   '--example': 'example',
   *   '-e': 'example'
   * }
   * ```
   */
  private createOptionMapping() {
    for (const optionName in this._options) {
      const optionItem = this._options[optionName];
      this._optionMapping.set(`--${optionName}`, optionName);
      optionItem.alias?.forEach(alias => {
        this._optionMapping.set(`-${alias}`, optionName);
      });
    }
  }

  private createUnparsedList() {
    for (const optionName in this._options) {
      this._unparsedList.add(optionName);
    }
  }

  parse(args: string[]): TParserOutput {
    const result = {} as TParserOutput;
    let i = ref(0);

    while (i.value < args.length) {
      const current = args[i.value];

      for (const [option, optionName] of this._optionMapping) {
        if (!current.startsWith(option)) {
          continue;
        }
        const optionItem = this._options[optionName];
        const value = this.getOptionValue(args, i, optionItem.typename);
        if (!value) {
          throw new CliError('Argument parsing error', `Expect value for option '${option}'`);
        }
        const optionValue = this.transformOptionValue(value, optionName, optionItem);
        result[optionName] = optionValue;
        this._unparsedList.delete(optionName);
      }
      i.value++;
    }

    for (const option of this._unparsedList) {
      const cliOption = this._options[option];
      if (cliOption.typename === 'boolean') {
        result[option] = false as any;
        continue;
      }
      if (cliOption.nullable) {
        continue;
      }
      result[option] = cliOption.default;
    }

    return result;
  }

  getDescriptions(): string {
    const descriptions = [] as Array<{ name: string; description: string }>;

    for (const optionName in this._options) {
      const optionItem = this._options[optionName];
      const desc = {
        name: optionName,
        description: `--${optionName}`,
      } as typeof descriptions[number];
      if (optionItem.alias) {
        desc.description = optionItem.alias.reduce((desc, alias) => `${desc} -${alias}`, desc.description);
      }
      desc.description += ` ${optionItem.description}`;
      descriptions.push(desc);
    }

    descriptions.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });

    return descriptions.map(desc => desc.description).join('\n');
  }

  private getOptionValue(args: string[], index: Ref<number>, typename: PrimitiveTypeName<any>): Nullable<string> {
    if (typename === 'boolean') {
      return '.'; // boolean type doesn't need a value. Just return an empty string to avoid error.
    }
    const current = args[index.value];
    if (current.includes('=')) {
      const value = current.split('=')[1];
      return value.length === 0 ? null : value;
    }
    index.value++;
    const next = args[index.value];
    if (!next) {
      return null;
    }
    if (next.startsWith('-')) {
      return null;
    }
    return next;
  }

  private transformOptionValue(
    inputValue: string,
    optionName: keyof TParserOutput,
    option: CommandLineOption<TParserOutput>[typeof optionName]
  ): TParserOutput[typeof optionName] {
    if (option.typename === 'boolean') {
      return true as any;
    }
    if (!option.transformer && option.typename !== 'string') {
      throw new CliError('Argument transformation error', `Cannot transform option '${optionName}': no transformer`);
    }
    const transformer = option.transformer ?? (input => input as TParserOutput[typeof optionName]);
    return transformer(inputValue);
  }
}
