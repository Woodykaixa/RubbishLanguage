import type { Nullable, KeyType, PrimitiveTypeName } from '@/common/type';

export type CommandLineOptionItemTransformer<TValue> = (input: string) => TValue;
export interface CommandLineOptionItemBase<TOptionName extends KeyType, TValue> {
  /** The type name of this option */
  typename: PrimitiveTypeName<TValue>;

  /** The main field used for cli parser. Starts with 2 dashes (--) */
  main: TOptionName extends string ? TOptionName : never;

  /** The abbreviations of the `main` field. Starts with 1 dash (-) */
  alias?: string[];

  /** Nullability of this option */
  nullable: boolean;

  /** Transform an input string from cli to `TValue` type */
  transformer: TValue extends string
    ? Nullable<CommandLineOptionItemTransformer<TValue>>
    : CommandLineOptionItemTransformer<TValue>;
}

export interface CommandLineOptionItemNullable<TOptionName extends KeyType, TValue>
  extends CommandLineOptionItemBase<TOptionName, TValue> {
  /** Nullability of this option */
  nullable: true;
}

export interface CommandLineOptionItemNonNullable<TOptionName extends KeyType, TValue>
  extends CommandLineOptionItemBase<TOptionName, TValue> {
  /** Nullability of this option */
  nullable: false;

  /** The default value of this item */
  default: TValue;
}

export type CommandLineOptionItem<TOptionName extends KeyType, TValue> =
  | CommandLineOptionItemNonNullable<TOptionName, TValue>
  | CommandLineOptionItemNullable<TOptionName, TValue>;

export type CommandLineOption<TOption = Record<string, any>> = {
  [TKey in keyof TOption]: CommandLineOptionItem<TKey, TOption[TKey]>;
};
