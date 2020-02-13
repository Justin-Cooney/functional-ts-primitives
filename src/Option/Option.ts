export type MatchType<TValue> = <T>(some: (value: TValue) => T, none: () => T) => T;
export type MatchAsyncType<TValue> = <T>(some: (value: TValue) => T, none: () => T) => T;
export type ToStringType = () => string;
export type HasValueType = () => boolean;
export type ValueOrDefaultType<TValue> = (defaultValue: TValue) => TValue;
export type DefaultIfNone<TValue> = (defaultValue: TValue) => Option<TValue>;
export type ToNullableType<TValue> = () => TValue | null;
export type MapType<TValue> = <TResult>(map: (some: TValue) => TResult) => Option<any>;
export type BindType<TValue> = <TResult>(bind: (some: TValue) => Option<TResult>) => Option<TResult>;
export type BindOnNoneType<TValue> = (bind: () => Option<TValue>) => Option<TValue>;
export type WhereType<TValue> = (predicate: (some: TValue) => boolean) => Option<TValue>;
export type DoType<TValue> = (doIfSome: (some: TValue) => void, doIfNone: () => void) => Option<TValue>;
export type DoIfSomeType<TValue> = (doIfSome: (some: TValue) => void) => Option<TValue>;
export type DoIfNoneType<TValue> = (doIfNone: () => void) => Option<TValue>;
export type ApplyType<TValue> = (applyIfSome: (some: TValue) => void, applyIfNone: () => void) => Option<TValue>;
export type ApplyIfSomeType<TValue> = (applyIfSome: (some: TValue) => void) => Option<TValue>;
export type ApplyIfNoneType<TValue> = (applyIfNone: () => void) => Option<TValue>;

export type Option<TValue> = {
	toString: () => string,
	hasValue: () => boolean,
	valueOrDefault: ValueOrDefaultType<TValue>,
	defaultIfNone: DefaultIfNone<TValue>,
	toNullable: () => TValue | null,
	match: MatchType<TValue>,
	map: MapType<TValue>,
	bind: BindType<TValue>,
	bindOnNone: BindOnNoneType<TValue>,
	where: WhereType<TValue>,
	do: DoType<TValue>,
	doIfSome: DoIfSomeType<TValue>,
	doIfNone: DoIfNoneType<TValue>,
	apply: ApplyType<TValue>,
	applyIfSome: ApplyIfSomeType<TValue>,
	applyIfNone: ApplyIfNoneType<TValue>
}