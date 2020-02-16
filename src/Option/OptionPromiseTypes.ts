import { Option } from ".";

export type OptionPromiseMatchType<TValue> = <T>(some: (value: TValue) => T, none: () => T) => Promise<T>;
export type OptionPromiseMatchAsyncType<TValue> = <T>(some: (value: TValue) => Promise<T>, none: () => Promise<T>) => Promise<T>;
export type OptionPromiseToStringAsyncType = () => Promise<string>;
export type OptionPromiseHasValueType = () => Promise<boolean>;
export type OptionPromiseValueOrDefaultType<TValue> = (defaultValue: () => TValue) => Promise<TValue>;
export type OptionPromiseValueOrDefaultAsyncType<TValue> = (defaultValue: () => Promise<TValue>) => Promise<TValue>;
export type OptionPromiseDefaultIfNone<TValue> = (defaultValue: () => TValue) => OptionPromise<TValue>;
export type OptionPromiseDefaultIfNoneAsync<TValue> = (defaultValue: () => Promise<TValue>) => OptionPromise<TValue>;
export type OptionPromiseToNullableType<TValue> = () => Promise<TValue | null>;
export type OptionPromiseMapType<TValue> = <TResult>(map: (some: TValue) => TResult) => OptionPromise<TResult>;
export type OptionPromiseMapAsyncType<TValue> = <TResult>(map: (some: TValue) => Promise<TResult>) => OptionPromise<TResult>;
export type OptionPromiseBindType<TValue> = <TResult>(bind: (some: TValue) => Option<TResult>) => OptionPromise<TResult>;
export type OptionPromiseBindAsyncType<TValue> = <TResult>(bind: (some: TValue) => OptionPromise<TResult>) => OptionPromise<TResult>;
export type OptionPromiseWhereType<TValue> = (predicate: (some: TValue) => boolean) => OptionPromise<TValue>;
export type OptionPromiseWhereAsyncType<TValue> = (predicate: (some: TValue) => Promise<boolean>) => OptionPromise<TValue>;
export type OptionPromiseDoType<TValue> = (doIfSome: (some: TValue) => void, doIfNone: () => void) => OptionPromise<TValue>;
export type OptionPromiseDoAsyncType<TValue> = (doIfSome: (some: TValue) => Promise<void>, doIfNone: () => Promise<void>) => OptionPromise<TValue>;
export type OptionPromiseDoAlwaysType<TValue> = (doAlways: () => void) => OptionPromise<TValue>;
export type OptionPromiseDoAlwaysAsyncType<TValue> = (doAlways: () => Promise<void>) => OptionPromise<TValue>;
export type OptionPromiseDoIfSomeType<TValue> = (doIfSome: (some: TValue) => void) => OptionPromise<TValue>;
export type OptionPromiseDoIfSomeAsyncType<TValue> = (doIfSome: (some: TValue) => Promise<void>) => OptionPromise<TValue>;
export type OptionPromiseDoIfNoneType<TValue> = (doIfNone: () => void) => OptionPromise<TValue>;
export type OptionPromiseDoIfNoneAsyncType<TValue> = (doIfNone: () => Promise<void>) => OptionPromise<TValue>;
export type OptionPromiseApplyType<TValue> = (applyIfSome: (some: TValue) => void, applyIfNone: () => void) => Promise<void>;
export type OptionPromiseApplyAsyncType<TValue> = (applyIfSome: (some: TValue) => Promise<void>, applyIfNone: () => Promise<void>) => Promise<void>;
export type OptionPromiseApplyAlwaysType = (applyAlways: () => void) => Promise<void>;
export type OptionPromiseApplyAlwaysAsyncType = (applyAlways: () => Promise<void>) => Promise<void>;
export type OptionPromiseApplyIfSomeType<TValue> = (applyIfSome: (some: TValue) => void) => Promise<void>;
export type OptionPromiseApplyIfSomeAsyncType<TValue> = (applyIfSome: (some: TValue) => Promise<void>) => Promise<void>;
export type OptionPromiseApplyIfNoneType = (applyIfNone: () => void) => Promise<void>;
export type OptionPromiseApplyIfNoneAsyncType = (applyIfNone: () => Promise<void>) => Promise<void>;


export type OptionPromise<TValue> = Promise<Option<TValue>> & {
	match: OptionPromiseMatchType<TValue>,
	matchAsync: OptionPromiseMatchAsyncType<TValue>,
	toStringAsync: OptionPromiseToStringAsyncType,
	hasValue: OptionPromiseHasValueType,
	valueOrDefault: OptionPromiseValueOrDefaultType<TValue>,
	valueOrDefaultAsync: OptionPromiseValueOrDefaultAsyncType<TValue>,
	defaultIfNone: OptionPromiseDefaultIfNone<TValue>,
	defaultIfNoneAsync: OptionPromiseDefaultIfNoneAsync<TValue>,
	toNullable: OptionPromiseToNullableType<TValue>,
	map: OptionPromiseMapType<TValue>,
	mapAsync: OptionPromiseMapAsyncType<TValue>,
	bind: OptionPromiseBindType<TValue>,
	bindAsync: OptionPromiseBindAsyncType<TValue>,
	where: OptionPromiseWhereType<TValue>,
	whereAsync: OptionPromiseWhereAsyncType<TValue>,
	do: OptionPromiseDoType<TValue>,
	doAsync: OptionPromiseDoAsyncType<TValue>,
	doAlways: OptionPromiseDoAlwaysType<TValue>,
	doAlwaysAsync: OptionPromiseDoAlwaysAsyncType<TValue>,
	doIfSome: OptionPromiseDoIfSomeType<TValue>,
	doIfSomeAsync: OptionPromiseDoIfSomeAsyncType<TValue>,
	doIfNone: OptionPromiseDoIfNoneType<TValue>,
	doIfNoneAsync: OptionPromiseDoIfNoneAsyncType<TValue>,
	apply: OptionPromiseApplyType<TValue>,
	applyAsync: OptionPromiseApplyAsyncType<TValue>,
	applyAlways: OptionPromiseApplyAlwaysType,
	applyAlwaysAsync: OptionPromiseApplyAlwaysAsyncType,
	applyIfSome: OptionPromiseApplyIfSomeType<TValue>,
	applyIfSomeAsync: OptionPromiseApplyIfSomeAsyncType<TValue>,
	applyIfNone: OptionPromiseApplyIfNoneType,
	applyIfNoneAsync: OptionPromiseApplyIfNoneAsyncType
}