import type { Ref, NullableRef } from '@/common/type';
export function ref<T>(value: T): Ref<T> {
  return { value };
}

export function nullableRef<T, TValue = NonNullable<T>>(value: TValue): NullableRef<TValue> {
  return { value };
}
