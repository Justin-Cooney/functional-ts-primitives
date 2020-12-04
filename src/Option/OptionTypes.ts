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
export type OptionBindOnNoneType<TValue> = (bind: () => Option<TValue>) => Option<TValue>;
export type OptionBindOnNoneAsyncType<TValue> = (bind: () => OptionPromise<TValue>) => OptionPromise<TValue>;
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

/**
 * Represents an object that may have some value  or no value.
 * @typeparam `TValue` - Type of object the option may contain.
 */
export type Option<TValue> = {
	/**
	 * @returns `Some: ${value}` if the option contains some or `None` if the option contains none.
	 */
	toString: OptionToStringType,
	/**
	 * If the Option has a value, then the delegate in the first parameter is invoked and it's result is returned. If the Option has no value, then the delegate in the second parameter is invoked instead.
	 */
	match: OptionMatchType<TValue>,
	/**
	 * If the Option has a value, then the delegate in the first parameter is invoked and it's result is returned. If the Option has no value, then the delegate in the second parameter is invoked instead.
	 */
	matchAsync: OptionMatchAsyncType<TValue>,
	/**
	 * @returns If `Some`, this extension will return `true`, and if `None` it will return `false`.
	 */
	hasValue: OptionHasValueType,
	/**
	 * @returns The value of the option if some, otherwise returns the specified default value.
	 */
	valueOrDefault: OptionValueOrDefaultType<TValue>,
	/**
	 * @returns The value of the option if some, otherwise returns the specified default value.
	 */
	valueOrDefaultAsync: OptionValueOrDefaultAsyncType<TValue>,
	/**
	 * @returns An `Option<TValue>` with the value of the option or the specified default value.
	 */
	defaultIfNone: OptionDefaultIfNone<TValue>,
	/**
	 * @returns An `Option<TValue>` with the value of the option or the specified default value.
	 */
	defaultIfNoneAsync: OptionDefaultIfNoneAsync<TValue>,
	/**
	 * @returns The value of the option or `null`.
	 */
	toNullable: OptionToNullableType<TValue>,
	/**
	 * @returns The option as an `Promise<Option<TValue>>.
	 */
	toPromise: OptionToPromiseType<TValue>,
	/**
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResult: OptionToResultType<TValue>,
	/**
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResultAsync: OptionToResultAsyncType<TValue>,
	/**
	 * @returns If `Some`, this extension will return an `Option` with the value produced by the delegate parameter, and if `None` it will return `None`.
	 */
	map: OptionMapType<TValue>,
	/**
	 * @returns If `Some`, this extension will return an `Option` with the value produced by the delegate parameter, and if `None` it will return `None`.
	 */
	mapAsync: OptionMapAsyncType<TValue>,
	/**
	 * @returns If `Some`, this extension will return the `Option` returned by the delegate parameter, and if `None` it will return `None`.
	 */
	bind: OptionBindType<TValue>,
	/**
	 * @returns If `Some`, this extension will return the `Option` returned by the delegate parameter, and if `None` it will return `None`.
	 */
	bindAsync: OptionBindAsyncType<TValue>,
	/**
	 * @returns If `Some`, this extension will return the original option, and if `None` it will return the `Option` returned by the delegate parameter.
	 */
	bindOnNone: OptionBindOnNoneType<TValue>,
	/**
	 * @returns If `Some`, this extension will return the original option, and if `None` it will return the `Option` returned by the delegate parameter.
	 */
	bindOnNoneAsync: OptionBindOnNoneAsyncType<TValue>,
	/**
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	where: OptionWhereType<TValue>,
	/**
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	whereAsync: OptionWhereAsyncType<TValue>,
	/**
	 * Performs actions depending on if the option has some value or none.
	 * @returns The original option.
	 */
	do: OptionDoType<TValue>,
	/**
	 * Performs actions depending on if the option has some value or none.
	 * @returns The original option.
	 */
	doAsync: OptionDoAsyncType<TValue>,
	/**
	 * Performs an action.
	 * @returns The original option.
	 */
	doAlways: OptionDoAlwaysType<TValue>,
	/**
	 * Performs an action.
	 * @returns The original option.
	 */
	doAlwaysAsync: OptionDoAlwaysAsyncType<TValue>,
	/**
	 * Performs an action if the option contains some.
	 * @returns The original option.
	 */
	doIfSome: OptionDoIfSomeType<TValue>,
	/**
	 * Performs an action if the option contains some.
	 * @returns The original option.
	 */
	doIfSomeAsync: OptionDoIfSomeAsyncType<TValue>,
	/**
	 * Performs an action if the option contains none.
	 * @returns The original option.
	 */
	doIfNone: OptionDoIfNoneType<TValue>,
	/**
	 * Performs an action if the option contains none.
	 * @returns The original option.
	 */
	doIfNoneAsync: OptionDoIfNoneAsyncType<TValue>,
	/**
	 * Performs actions depending on if the option has some value or none.
	 */
	apply: OptionApplyType<TValue>,
	/**
	 * Performs actions depending on if the option has some value or none.
	 */
	applyAsync: OptionApplyAsyncType<TValue>,
	/**
	 * Performs action
	 */
	applyAlways: OptionApplyAlwaysType,
	/**
	 * Performs action
	 */
	applyAlwaysAsync: OptionApplyAlwaysAsyncType,
	/**
	 * Performs an action if the option contains some.
	 */
	applyIfSome: OptionApplyIfSomeType<TValue>,
	/**
	 * Performs an action if the option contains some.
	 */
	applyIfSomeAsync: OptionApplyIfSomeAsyncType<TValue>,
	/**
	 * Performs an action if the option contains none.
	 */
	applyIfNone: OptionApplyIfNoneType,
	/**
	 * Performs an action if the option contains none.
	 */
	applyIfNoneAsync: OptionApplyIfNoneAsyncType
}