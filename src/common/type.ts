/** Wrap a value in an object and pass the object through codes, so we can modify it's value  */
export type Ref<T> = {
  value: T;
};

export type NullableRef<T> = Ref<Nullable<T>>;

export type Nullable<T> = T | null | undefined;

export type KeyType = keyof any;

/** Get the name of JavaScript's primitive type */
export type PrimitiveTypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends symbol
  ? 'symbol'
  : T extends Function
  ? 'function'
  : T extends bigint
  ? 'bigint'
  : T extends object
  ? 'object'
  : never;
