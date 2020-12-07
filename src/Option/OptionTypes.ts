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
 * Represents an object that either has some value or no value.
 * @typeparam `TValue` - Type of object the option may contain.
 */
export type Option<TValue> = {
	/**
	 * Returns a string representing the content of the Option.
	 * @returns `Some: ${value}` if the option contains some or `None` if the option contains none.
	 */
	toString: OptionToStringType,
	
	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	match: OptionMatchType<TValue>,

	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	matchAsync: OptionMatchAsyncType<TValue>,

	/**
	 * If the Option has a value, this extension will return `true`. If the Option has no value it will return `false`.
	 * @returns A boolean representing whether the Option has value or not.
	 */
	hasValue: OptionHasValueType,

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefault: OptionValueOrDefaultType<TValue>,

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefaultAsync: OptionValueOrDefaultAsyncType<TValue>,

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNone: OptionDefaultIfNone<TValue>,

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNoneAsync: OptionDefaultIfNoneAsync<TValue>,

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return null.
	 * @returns The value of the option or `null`.
	 */
	toNullable: OptionToNullableType<TValue>,

	/**
	 * Returns the Option as an OptionPromise.
	 * @returns The option as an `OptionPromise<TValue>`.
	 */
	toPromise: OptionToPromiseType<TValue>,

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResult: OptionToResultType<TValue>,

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResultAsync: OptionToResultAsyncType<TValue>,

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	map: OptionMapType<TValue>,

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	mapAsync: OptionMapAsyncType<TValue>,

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bind: OptionBindType<TValue>,

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bindAsync: OptionBindAsyncType<TValue>,

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNone: OptionBindOnNoneType<TValue>,

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNoneAsync: OptionBindOnNoneAsyncType<TValue>,

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	where: OptionWhereType<TValue>,

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	whereAsync: OptionWhereAsyncType<TValue>,
	
	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	do: OptionDoType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doAsync: OptionDoAsyncType<TValue>,

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlways: OptionDoAlwaysType<TValue>,

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlwaysAsync: OptionDoAlwaysAsyncType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSome: OptionDoIfSomeType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSomeAsync: OptionDoIfSomeAsyncType<TValue>,

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNone: OptionDoIfNoneType<TValue>,

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNoneAsync: OptionDoIfNoneAsyncType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 */
	apply: OptionApplyType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyAsync: OptionApplyAsyncType<TValue>,

	/**
	 * Performs the function provided as the first parameter.
	 * @param applyAlways The function to be executed.
	 */
	applyAlways: OptionApplyAlwaysType,

	/**
	 * Performs the function provided as the first parameter.
	 * @param applyAlways The function to be executed.
	 */
	applyAlwaysAsync: OptionApplyAlwaysAsyncType,

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSome: OptionApplyIfSomeType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSomeAsync: OptionApplyIfSomeAsyncType<TValue>,

	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNone: OptionApplyIfNoneType,
	
	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNoneAsync: OptionApplyIfNoneAsyncType
}