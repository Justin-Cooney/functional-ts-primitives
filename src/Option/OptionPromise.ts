import { Option, ResultPromise } from "../index";

/**
 * Represents an object that either has some value or no value.
 * @typeparam `TValue` - Type of object the option may contain.
 */
export class OptionPromise<TValue> implements Promise<Option<TValue>> {
	constructor(private readonly _promise: Promise<Option<TValue>>) {
		this[Symbol.toStringTag] = _promise[Symbol.toStringTag];
	}

	then<TResult1 = Option<TValue>, TResult2 = never>(onfulfilled?: ((value: Option<TValue>) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
		return this._promise.then(onfulfilled, onrejected);
	}

	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<Option<TValue> | TResult> {
		return this._promise.catch(onrejected);
	}

	[Symbol.toStringTag]: string;

	finally(onfinally?: (() => void) | null | undefined): Promise<Option<TValue>> {
		return this._promise.finally(onfinally);
	}

	toOptionPromise<TValue>(this: Promise<Option<TValue>>): OptionPromise<TValue> {
		return this as OptionPromise<TValue>;
	}

	toResultPromise<TSuccess, TFailure>(this: Promise<import("..").Result<TSuccess, TFailure>>): ResultPromise<TSuccess, TFailure> {
		throw new Error("Method not implemented.");
	}

	/**
	 * Returns a string representing the content of the Option.
	 * @returns `Some: ${value}` if the option contains some or `None` if the option contains none.
	 */
	toStringAsync() : Promise<string> { return this.then(option => option.toString()); }

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResult<TFailure>(failureFactory: () => TFailure) : ResultPromise<TValue, TFailure> { return new ResultPromise(this.then(option => option.toResult(failureFactory))); }

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResultAsync<TFailure> (failureFactory: () => Promise<TFailure>) : ResultPromise<TValue, TFailure> { return new ResultPromise(this.then(option => option.toResultAsync(failureFactory))); }


	/**
	 * If the Option has a value, this extension will return `true`. If the Option has no value it will return `false`.
	 * @returns A boolean representing whether the Option has value or not.
	 */
	hasValue() : Promise<boolean> { return this.then(option => option.hasValue()); }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefault(defaultValue: () => TValue) : Promise<TValue> { return this.then(option => option.valueOrDefault(defaultValue)); }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefaultAsync(defaultValue: () => Promise<TValue>) : Promise<TValue> { return this.then(option => option.valueOrDefaultAsync(defaultValue)); }

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNone(defaultValue: () => TValue) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.defaultIfNone(defaultValue))); }

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNoneAsync(defaultValue: () => Promise<TValue>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.defaultIfNoneAsync(defaultValue))); }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return null.
	 * @returns The value of the option or `null`.
	 */
	toNullable () : Promise<TValue | null> { return this.then(option => option.toNullable()); }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return undefined.
	 * @returns The value of the option or `undefined`.
	 */
	valueOrUndefined () : Promise<TValue | undefined> { return this.then(option => option.valueOrUndefined()); }

	/**
	 * If the Option has an array value, the array is returned. Otherwise an empty array is returned
	 * @returns The Option's array or an empty array
	 */
	valueOrEmpty<T>(this: OptionPromise<T[]>) : Promise<T[]> { return this.then(option => option.valueOrEmpty()); }

	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @typeparam `T` The return type of the function.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	match<T>(some: ((some: TValue) => T), none: () => T) : Promise<T> { return this.then(option => option.match(some, none)); }

	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @typeparam `T` The return type of the function.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	matchAsync<T>(some: ((some: TValue) => Promise<T>), none: () => Promise<T>) : Promise<T> { return this.then(option => option.matchAsync(some, none)); }

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `T` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	map<T>(map: (some: TValue) => T) : OptionPromise<T> { return new OptionPromise(this.then(option => option.map(map))); }

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	mapAsync<TResult>(map: (some: TValue) => Promise<TResult>) : OptionPromise<TResult> { return new OptionPromise(this.then(option => option.mapAsync(map))); }

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bind<TResult>(bind: (some: TValue) => Option<TResult>) : OptionPromise<TResult> { return new OptionPromise(this.then(option => option.bind(bind))); }

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bindAsync<TResult>(bind: (some: TValue) => OptionPromise<TResult>) : OptionPromise<TResult> { return new OptionPromise(this.then(option => option.bindAsync(bind))); }

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNone(bind: () => Option<TValue>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.bindOnNone(bind))); }

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNoneAsync(bind: () => OptionPromise<TValue>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.bindOnNoneAsync(bind))); }

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	where(predicate: (some: TValue) => boolean) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.where(predicate))); }

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	whereAsync(predicate: (some: TValue) => Promise<boolean>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.whereAsync(predicate))); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	do(doIfSome: (some: TValue) => void, doIfNone: () => void) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.do(doIfSome, doIfNone))); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doAsync(doIfSome: (some: TValue) => Promise<void>, doIfNone: () => Promise<void>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doAsync(doIfSome, doIfNone))); }

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlways(doAlways: () => void) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doAlways(doAlways))); }

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlwaysAsync(doAlways: () => Promise<void>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doAlwaysAsync(doAlways))); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSome(doIfSome: (some: TValue) => void) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doIfSome(doIfSome))); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSomeAsync(doIfSome: (some: TValue) => Promise<void>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doIfSomeAsync(doIfSome))); }

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNone(doIfNone: () => void) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doIfNone(doIfNone))); }

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNoneAsync(doIfNone: () => Promise<void>) : OptionPromise<TValue> { return new OptionPromise(this.then(option => option.doIfNoneAsync(doIfNone))); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 */
	apply(applyIfSome: (some: TValue) => void, applyIfNone: () => void) : Promise<void> { return this.then(option => option.apply(applyIfSome, applyIfNone)); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyAsync(applyIfSome: (some: TValue) => Promise<void>, applyIfNone: () => Promise<void>) : Promise<void> { return this.then(option => option.applyAsync(applyIfSome, applyIfNone)); }

	/**
	 * Performs the function provided as the first parameter.
	 * @param applyAlways The function to be executed.
	 */
	applyAlways(applyAlways: () => void) : Promise<void> { return this.then(option => option.applyAlways(applyAlways)); }

	/**
	 * Performs the function provided as the first parameter.
	 * @param applyAlways The function to be executed.
	 */
	applyAlwaysAsync(applyAlways: () => Promise<void>) : Promise<void> { return this.then(option => option.applyAlwaysAsync(applyAlways)); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSome(applyIfSome: (some: TValue) => void) : Promise<void> { return this.then(option => option.applyIfSome(applyIfSome)); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSomeAsync(applyIfSome: (some: TValue) => Promise<void>) : Promise<void> { return this.then(option => option.applyIfSomeAsync(applyIfSome)); }

	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNone(applyIfNone: () => void) : Promise<void> { return this.then(option => option.applyIfNone(applyIfNone)); }
	
	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNoneAsync(applyIfNone: () => Promise<void>) : Promise<void> { return this.then(option => option.applyIfNoneAsync(applyIfNone)); }
}