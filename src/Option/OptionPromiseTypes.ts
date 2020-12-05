import { Option } from ".";
import { ResultPromise } from "../Result";

export type OptionPromiseMatchType<TValue> = <T>(some: (value: TValue) => T, none: () => T) => Promise<T>;
export type OptionPromiseMatchAsyncType<TValue> = <T>(some: (value: TValue) => Promise<T>, none: () => Promise<T>) => Promise<T>;
export type OptionPromiseToStringAsyncType = () => Promise<string>;
export type OptionPromiseHasValueType = () => Promise<boolean>;
export type OptionPromiseValueOrDefaultType<TValue> = (defaultValue: () => TValue) => Promise<TValue>;
export type OptionPromiseValueOrDefaultAsyncType<TValue> = (defaultValue: () => Promise<TValue>) => Promise<TValue>;
export type OptionPromiseDefaultIfNone<TValue> = (defaultValue: () => TValue) => OptionPromise<TValue>;
export type OptionPromiseDefaultIfNoneAsync<TValue> = (defaultValue: () => Promise<TValue>) => OptionPromise<TValue>;
export type OptionPromiseToNullableType<TValue> = () => Promise<TValue | null>;
export type OptionPromiseToResultType<TValue> = <TFailure> (failureFactory: () => TFailure) => ResultPromise<TValue, TFailure>;
export type OptionPromiseToResultAsyncType<TValue> = <TFailure> (failureFactory: () => Promise<TFailure>) => ResultPromise<TValue, TFailure>;
export type OptionPromiseMapType<TValue> = <TResult>(map: (some: TValue) => TResult) => OptionPromise<TResult>;
export type OptionPromiseMapAsyncType<TValue> = <TResult>(map: (some: TValue) => Promise<TResult>) => OptionPromise<TResult>;
export type OptionPromiseBindType<TValue> = <TResult>(bind: (some: TValue) => Option<TResult>) => OptionPromise<TResult>;
export type OptionPromiseBindAsyncType<TValue> = <TResult>(bind: (some: TValue) => OptionPromise<TResult>) => OptionPromise<TResult>;
export type OptionPromiseBindNoneType<TValue> = (bind: () => Option<TValue>) => Option<TValue>;
export type OptionPromiseBindNoneAsyncType<TValue> = (bind: () => OptionPromise<TValue>) => OptionPromise<TValue>;
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
	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	match: OptionPromiseMatchType<TValue>,

	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	matchAsync: OptionPromiseMatchAsyncType<TValue>,

	/**
	 * @returns `Some: ${value}` if the option contains some or `None` if the option contains none.
	 */
	toStringAsync: OptionPromiseToStringAsyncType,

	/**
	 * If the Option has a value, this extension will return `true`. If the Option has no value it will return `false`.
	 * @returns A boolean representing whether the Option has value or not.
	 */
	hasValue: OptionPromiseHasValueType,

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefault: OptionPromiseValueOrDefaultType<TValue>,

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefaultAsync: OptionPromiseValueOrDefaultAsyncType<TValue>,

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNone: OptionPromiseDefaultIfNone<TValue>,

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNoneAsync: OptionPromiseDefaultIfNoneAsync<TValue>,

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return null.
	 * @returns The value of the option or `null`.
	 */
	toNullable: OptionPromiseToNullableType<TValue>,

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResult: OptionPromiseToResultType<TValue>,

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResultAsync: OptionPromiseToResultAsyncType<TValue>,

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	map: OptionPromiseMapType<TValue>,

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	mapAsync: OptionPromiseMapAsyncType<TValue>,

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bind: OptionPromiseBindType<TValue>,

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bindAsync: OptionPromiseBindAsyncType<TValue>,

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNone: OptionPromiseBindNoneAsyncType<TValue>,

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNoneAsync: OptionPromiseBindNoneAsyncType<TValue>,

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	where: OptionPromiseWhereType<TValue>,

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	whereAsync: OptionPromiseWhereAsyncType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	do: OptionPromiseDoType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doAsync: OptionPromiseDoAsyncType<TValue>,

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlways: OptionPromiseDoAlwaysType<TValue>,

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlwaysAsync: OptionPromiseDoAlwaysAsyncType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSome: OptionPromiseDoIfSomeType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSomeAsync: OptionPromiseDoIfSomeAsyncType<TValue>,

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNone: OptionPromiseDoIfNoneType<TValue>,

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNoneAsync: OptionPromiseDoIfNoneAsyncType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 */
	apply: OptionPromiseApplyType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 */
	applyAsync: OptionPromiseApplyAsyncType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyAlways: OptionPromiseApplyAlwaysType,

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyAlwaysAsync: OptionPromiseApplyAlwaysAsyncType,

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSome: OptionPromiseApplyIfSomeType<TValue>,

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSomeAsync: OptionPromiseApplyIfSomeAsyncType<TValue>,

	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNone: OptionPromiseApplyIfNoneType,
	
	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNoneAsync: OptionPromiseApplyIfNoneAsyncType
}