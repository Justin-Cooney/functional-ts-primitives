import { OptionPromise } from "./OptionPromiseTypes";
import { Result, ResultPromise } from "../Result";

export type OptionMatchType<TValue> = <T>(some: (value: TValue) => T, none: () => T) => T;
export type OptionMatchAsyncType<TValue> = <T>(some: (value: TValue) => Promise<T>, none: () => Promise<T>) => Promise<T>;
export type OptionToStringType = () => string;
export type OptionHasValueType = () => boolean;
export type OptionValueOrDefaultType<TValue> = (defaultValue: () => TValue) => TValue;
export type OptionValueOrDefaultAsyncType<TValue> = (defaultValue: () => Promise<TValue>) => Promise<TValue>;
export type OptionDefaultIfNone<TValue> = (defaultValue: () => TValue) => Option<TValue>;
export type OptionDefaultIfNoneAsync<TValue> = (defaultValue: () => Promise<TValue>) => OptionPromise<TValue>;
export type OptionToNullableType<TValue> = () => TValue | null;
export type OptionToPromiseType<TValue> = () => OptionPromise<TValue>;
export type OptionToResultType<TValue> = <TFailure> (failureFactory: () => TFailure) => Result<TValue, TFailure>;
export type OptionToResultAsyncType<TValue> = <TFailure> (failureFactory: () => Promise<TFailure>) => ResultPromise<TValue, TFailure>;
export type OptionMapType<TValue> = <TResult>(map: (some: TValue) => TResult) => Option<TResult>;
export type OptionMapAsyncType<TValue> = <TResult>(map: (some: TValue) => Promise<TResult>) => OptionPromise<TResult>;
export type OptionBindType<TValue> = <TResult>(bind: (some: TValue) => Option<TResult>) => Option<TResult>;
export type OptionBindAsyncType<TValue> = <TResult>(bind: (some: TValue) => OptionPromise<TResult>) => OptionPromise<TResult>;
export type OptionWhereType<TValue> = (predicate: (some: TValue) => boolean) => Option<TValue>;
export type OptionWhereAsyncType<TValue> = (predicate: (some: TValue) => Promise<boolean>) => OptionPromise<TValue>;
export type OptionDoType<TValue> = (doIfSome: (some: TValue) => void, doIfNone: () => void) => Option<TValue>;
export type OptionDoAsyncType<TValue> = (doIfSome: (some: TValue) => Promise<void>, doIfNone: () => Promise<void>) => OptionPromise<TValue>;
export type OptionDoAlwaysType<TValue> = (doAlways: () => void) => Option<TValue>;
export type OptionDoAlwaysAsyncType<TValue> = (doAlways: () => Promise<void>) => OptionPromise<TValue>;
export type OptionDoIfSomeType<TValue> = (doIfSome: (some: TValue) => void) => Option<TValue>;
export type OptionDoIfSomeAsyncType<TValue> = (doIfSome: (some: TValue) => Promise<void>) => OptionPromise<TValue>;
export type OptionDoIfNoneType<TValue> = (doIfNone: () => void) => Option<TValue>;
export type OptionDoIfNoneAsyncType<TValue> = (doIfNone: () => Promise<void>) => OptionPromise<TValue>;
export type OptionApplyType<TValue> = (applyIfSome: (some: TValue) => void, applyIfNone: () => void) => void;
export type OptionApplyAsyncType<TValue> = (applyIfSome: (some: TValue) => Promise<void>, applyIfNone: () => Promise<void>) => Promise<void>;
export type OptionApplyAlwaysType = (applyAlways: () => void) => void;
export type OptionApplyAlwaysAsyncType = (applyAlways: () => Promise<void>) => Promise<void>;
export type OptionApplyIfSomeType<TValue> = (applyIfSome: (some: TValue) => void) => void;
export type OptionApplyIfSomeAsyncType<TValue> = (applyIfSome: (some: TValue) => Promise<void>) => Promise<void>;
export type OptionApplyIfNoneType = (applyIfNone: () => void) => void;
export type OptionApplyIfNoneAsyncType = (applyIfNone: () => Promise<void>) => Promise<void>;

export type Option<TValue> = {
	toString: OptionToStringType,
	 match: OptionMatchType<TValue>,
	matchAsync: OptionMatchAsyncType<TValue>,
	hasValue: OptionHasValueType,
	valueOrDefault: OptionValueOrDefaultType<TValue>,
	valueOrDefaultAsync: OptionValueOrDefaultAsyncType<TValue>,
	defaultIfNone: OptionDefaultIfNone<TValue>,
	defaultIfNoneAsync: OptionDefaultIfNoneAsync<TValue>,
	toNullable: OptionToNullableType<TValue>,
	toPromise: OptionToPromiseType<TValue>,
	toResult: OptionToResultType<TValue>,
	toResultAsync: OptionToResultAsyncType<TValue>,
	map: OptionMapType<TValue>,
	mapAsync: OptionMapAsyncType<TValue>,
	bind: OptionBindType<TValue>,
	bindAsync: OptionBindAsyncType<TValue>,
	where: OptionWhereType<TValue>,
	whereAsync: OptionWhereAsyncType<TValue>,
	do: OptionDoType<TValue>,
	doAsync: OptionDoAsyncType<TValue>,
	doAlways: OptionDoAlwaysType<TValue>,
	doAlwaysAsync: OptionDoAlwaysAsyncType<TValue>,
	doIfSome: OptionDoIfSomeType<TValue>,
	doIfSomeAsync: OptionDoIfSomeAsyncType<TValue>,
	doIfNone: OptionDoIfNoneType<TValue>,
	doIfNoneAsync: OptionDoIfNoneAsyncType<TValue>,
	apply: OptionApplyType<TValue>,
	applyAsync: OptionApplyAsyncType<TValue>,
	applyAlways: OptionApplyAlwaysType,
	applyAlwaysAsync: OptionApplyAlwaysAsyncType,
	applyIfSome: OptionApplyIfSomeType<TValue>,
	applyIfSomeAsync: OptionApplyIfSomeAsyncType<TValue>,
	applyIfNone: OptionApplyIfNoneType,
	applyIfNoneAsync: OptionApplyIfNoneAsyncType
}