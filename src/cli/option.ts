import type { Nullable, KeyType, PrimitiveTypeName } from '@/common/type';

type CommandLineOptionItemTransformer<TValue extends any> = (input: string) => TValue;

/**
 * Type definition for all options.
 */
interface CommandLineOptionItemBase<TValue> {
  /** The type name of this option */
  typename: PrimitiveTypeName<TValue>;

  /** The abbreviations of this option. Starts with 1 dash (-) */
  alias?: string[];
}

/**
 * Special CommandLineOptionItem type for boolean options. It doesn't need a `transformer` field. If this field exists
 * in args, it means true.
 */
type CommandLineOptionItemBoolean = CommandLineOptionItemBase<boolean>;

interface CommandLineOptionItemNullable<TValue> extends CommandLineOptionItemBase<TValue> {
  /** Nullability of this option */
  nullable: true;
}

interface CommandLineOptionItemNonNullable<TValue> extends CommandLineOptionItemBase<TValue> {
  /** Nullability of this option */
  nullable: false;

  /** The default value of this item */
  default: TValue;
}

type CommandLineOptionItemRest<TValue> = (
  | CommandLineOptionItemNonNullable<TValue>
  | CommandLineOptionItemNullable<TValue>
) & {
  /** Transform an input string from cli to `TValue` type */
  transformer: TValue extends string
    ? Nullable<CommandLineOptionItemTransformer<TValue>>
    : CommandLineOptionItemTransformer<TValue>;
};

/**
 * The information of an command line option. Its type is depends on TValue. For boolean option, it just have
 * `typename` and `alias`. For other types, it also includes a `nullable` property. If `nullable` is true, it
 * means this user doesn't need to configure themselves, and you should provide an `default` value. Otherwise,
 * the value comes from command line.
 */
export type CommandLineOptionItem<TValue> = TValue extends boolean
  ? CommandLineOptionItemBoolean
  : CommandLineOptionItemRest<TValue>;

/**
 * Type definition for `CommandLineParser`. This type defines a key-value pair as a parser options. The key is name
 * of an option, and the value describe its information.
 */
export type CommandLineOption<TOption = Record<string, any>> = {
  [TKey in keyof TOption]: CommandLineOptionItem<TOption[TKey]>;
};
