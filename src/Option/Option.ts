import { Unit, Result, OptionPromise, ResultPromise } from "../index";

/**
 * Represents an object that either has some value or no value.
 * @typeparam `TValue` - Type of object the option may contain.
 */
export class Option<TValue> {
	constructor(private readonly _hasValue: boolean, private readonly _value: TValue | undefined) {}

	/**
	 * Returns a string representing the content of the Option.
	 * @returns `Some: ${value}` if the option contains some or `None` if the option contains none.
	 */
	toString() : string { return this._hasValue ? `Some: ${this._value}` : "None"; }

	/**
	 * Returns the Option as an OptionPromise.
	 * @returns The option as an `OptionPromise<TValue>`.
	 */
	toPromise() : OptionPromise<TValue> { return new OptionPromise(Promise.resolve(this)) }

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResult<TFailure>(failureFactory: () => TFailure) : Result<TValue, TFailure> { return this._hasValue ? Result.success<TValue, TFailure>(this._value as TValue) : Result.failure<TValue, TFailure>(failureFactory()); }

	/**
	 * If the Option has a value, returns a successful `Result<TValue, TFailure>` with the value. If the Option has no value, returns a failed `Result<TValue, TFailure>` with the value generated by the provided failure factory.
	 * @param failureFactory A function that produces a failure value for the result that is returned if the option has no value.
	 * @returns A successful result if the option has a value, otherwise returns a failure with the value produced from the failure factory.
	 */
	toResultAsync<TFailure> (failureFactory: () => Promise<TFailure>) : ResultPromise<TValue, TFailure> { return this._hasValue ? Result.successAsync<TValue, TFailure>(() => Promise.resolve(this._value as TValue)) : Result.failureAsync<TValue, TFailure>(failureFactory) }

	/**
	 * If the Option has a value, returns an array with the value as a single item. If the Option has no value returns an empty array.
	 * @returns The contained value as an array or an empty array.
	 */
	toArray() : TValue[] { return this._hasValue ? [ this._value as TValue ] : []; }

	/**
	 * If the Option has a value, this extension will return `true`. If the Option has no value it will return `false`.
	 * @returns A boolean representing whether the Option has value or not.
	 */
	hasValue() : boolean { return this._hasValue }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefault(defaultValue: () => TValue) : TValue { return this._hasValue ? this._value as TValue : defaultValue() }
	
	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return the default value produced by the function provided as the first argument.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns The value of the Option or a default value.
	 */
	valueOrDefaultAsync(defaultValue: () => Promise<TValue>) : Promise<TValue> { return this._hasValue ? Promise.resolve(this._value as TValue) : Promise.resolve(defaultValue()); }

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNone(defaultValue: () => TValue) : Option<TValue> { return this._hasValue ? Option.some(this._value as TValue) : Option.some(defaultValue()) }

	/**
	 * If the Option has a value, this extension will return the Option with its value. If the Option has no value it will return an Option with the default value produced by the provided function.
	 * @param defaultValue A function that produces the default value that is returned if the Option has no value.
	 * @returns An Option with the value of the Option or a default value.
	 */
	defaultIfNoneAsync(defaultValue: () => Promise<TValue>) : OptionPromise<TValue> { return this._hasValue ? Option.someAsync(() => Promise.resolve(this._value as TValue)) : Option.someAsync(() => Promise.resolve(defaultValue())) }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return null.
	 * @returns The value of the option or `null`.
	 */
	toNullable() : TValue | null { return this._hasValue ? this._value as TValue : null }

	/**
	 * If the Option has a value, this extension will return the value. If the Option has no value it will return undefined.
	 * @returns The value of the option or `undefined`.
	 */
	valueOrUndefined() : TValue | undefined { return this._hasValue ? this._value as TValue : undefined; }

	/**
	 * If the option has some value, the value is returned. If the option has no value an error is generated and thrown. Warning: This function has the potential to throw errors and should be used with caution.
	 * @param errorFactory A factory for generating an error in the case the option has no value.
	 * @returns The value of the Option.
	 */
	throwOnNone(errorFactory: () => Error) : TValue {
		if(this._hasValue) return this._value as TValue;
		throw errorFactory();
	}

	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @typeparam `T` The return type of the function.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	match<T>(some: ((some: TValue) => T), none: () => T) : T { return this._hasValue ? some(this._value as TValue) : none(); }

	/**
	 * If the Option has a value, then the function in the first parameter is invoked and it's result is returned. If the Option has no value, then the function in the second parameter is invoked instead.
	 * @typeparam `T` The return type of the function.
	 * @param some A function that is executed if the option has some value.
	 * @param none A function that is executed if the option has no value.
	 * @returns The result of the appropriate function.
	 */
	matchAsync<T>(some: ((some: TValue) => Promise<T>), none: () => Promise<T>) : Promise<T> { return this._hasValue ? some(this._value as TValue) : none(); }

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	map<TResult>(map: (some: TValue) => TResult) : Option<TResult> { return this._hasValue ? Option.some(map(this._value as TValue)) : Option.none<TResult>(); }

	/**
	 * If the Option has a value, returns a new `Option<TResult>` with the result generated by the function passed in as the first argument. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the current value to a new value if the Option has a value.
	 * @returns An Option that contains the mapped value or no value.
	 */
	mapAsync<TResult>(map: (some: TValue) => Promise<TResult>) : OptionPromise<TResult> { return this._hasValue ? Option.someAsync(() => map(this._value as TValue)) : Option.noneAsync<TResult>(); }

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bind<TResult>(bind: (some: TValue) => Option<TResult>) : Option<TResult> { return this._hasValue ? bind(this._value as TValue) : Option.none<TResult>()}

	/**
	 * If the Option has a value, returns the `Option<TResult>` generated by the bind function passed in the first parameter. If the Option has no value, returns an empty `Option<TResult>`.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param bind A function that maps the current value to a new `Option<TResult>` if the option has a value.
	 * @returns An `Option<TResult>` that has been generated by the bind function or is empty.
	 */
	bindAsync<TResult>(bind: (some: TValue) => OptionPromise<TResult>) : OptionPromise<TResult> { return this._hasValue ? bind(this._value as TValue) : Option.noneAsync<TResult>(); }

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNone(bind: () => Option<TValue>) : Option<TValue> { return this._hasValue ? this : bind(); }

	/**
	 * If the Option has a value, returns the Option with its value. If the Option has no value, returns an Option generated by the function passed in as the first parameter.
	 * @param bind A function that maps an empty value to a new `Option<TValue>`.
	 * @returns An `Option<TValue>` containing the original value or a value generate by the bind function.
	 */
	bindOnNoneAsync(bind: () => OptionPromise<TValue>) : OptionPromise<TValue> { return this._hasValue ? this.toPromise() : bind(); }

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	where(predicate: (some: TValue) => boolean) : Option<TValue> { return this._hasValue ? predicate(this._value as TValue) ? this : Option.none<TValue>() : Option.none<TValue>(); }

	/**
	 * If the Option has a value and the predicate function is true, returns an Option with the original value. Otherwise, returns an Option with no value.
	 * @param predicate A function that maps the Option's value to a boolean representing whether the returned value is empty or contains the original value.
	 * @returns If the predicate resolves to true returns the option with it's value, otherwise returns none.
	 */
	whereAsync(predicate: (some: TValue) => Promise<boolean>) : OptionPromise<TValue> { return this._hasValue ? new OptionPromise(predicate(this._value as TValue).then(isSome => isSome ? this : Option.none<TValue>())) : Option.noneAsync<TValue>(); }

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	do(doIfSome: (some: TValue) => void, doIfNone: () => void) : Option<TValue> {
		if(this._hasValue) doIfSome(this._value as TValue); else doIfNone();
		return this;
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doAsync(doIfSome: (some: TValue) => Promise<void>, doIfNone: () => Promise<void>) : OptionPromise<TValue> {
		if(this._hasValue)
			return new OptionPromise(doIfSome(this._value as TValue).then(_ => this));
		else
			return new OptionPromise(doIfNone().then(_ => this));
	}

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlways(doAlways: () => void) : Option<TValue> {
		doAlways();
		return this;
	}

	/**
	 * Performs the function provided as the first parameter and returns the original option.
	 * @param doAlways The function to be executed.
	 * @returns The original option.
	 */
	doAlwaysAsync(doAlways: () => Promise<void>) : OptionPromise<TValue> {
		return new OptionPromise(doAlways().then(_ => this));
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSome(doIfSome: (some: TValue) => void) : Option<TValue> {
		if(this._hasValue) doIfSome(this._value as TValue);
		return this;
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @returns The original Option.
	 */
	doIfSomeAsync(doIfSome: (some: TValue) => Promise<void>) : OptionPromise<TValue> {
		if(this._hasValue)
			return new OptionPromise(doIfSome(this._value as TValue).then(_ => this));
		return this.toPromise();
	}

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNone(doIfNone: () => void) : Option<TValue> {
		if(!this._hasValue) doIfNone();
		return this;
	}

	/**
	 * If the Option has no value, performs the function provided as the first parameter. The original Option is always returned.
	 * @param doIfNone The function to be executed if the Option has no value.
	 * @returns The original Option.
	 */
	doIfNoneAsync(doIfNone: () => Promise<void>) : OptionPromise<TValue> {
		if(!this._hasValue)
			return new OptionPromise(doIfNone().then(_ => this));
		return this.toPromise();
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param doIfSome The function to be executed if the Option has a value.
	 * @param doIfNone The function to be executed if the Option has no value.
	 */
	apply(applyIfSome: (some: TValue) => void, applyIfNone: () => void) : void {
		if(this._hasValue) applyIfSome(this._value as TValue); else applyIfNone();
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter. If the Option has no value, performs the function provided as the second parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyAsync(applyIfSome: (some: TValue) => Promise<void>, applyIfNone: () => Promise<void>) : Promise<void> {
		if(this._hasValue)
			return applyIfSome(this._value as TValue);
		else
			return applyIfNone();
	}

	/**
	 * Performs the function provided as the first parameter.
	 * @param applyAlways The function to be executed.
	 */
	applyAlways(applyAlways: () => void) : void {
		applyAlways();
	}

	/**
	 * Performs the function provided as the first parameter.
	 * @param applyAlways The function to be executed.
	 */
	applyAlwaysAsync(applyAlways: () => Promise<void>) : Promise<void> {
		return applyAlways();
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSome(applyIfSome: (some: TValue) => void) : void {
		if(this._hasValue)
			applyIfSome(this._value as TValue);
	}

	/**
	 * If the Option has a value, performs the function provided as the first parameter.
	 * @param applyIfSome The function to be executed if the Option has a value.
	 */
	applyIfSomeAsync(applyIfSome: (some: TValue) => Promise<void>) : Promise<void> {
		if(this._hasValue)
			return applyIfSome(this._value as TValue);
		return Promise.resolve();
	}

	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNone(applyIfNone: () => void) : void {
		if(!this._hasValue)
			applyIfNone();
	}
	
	/**
	 * If the Option has no value, performs the function provided as the first parameter.
	 * @param applyIfNone The function to be executed if the Option has no value.
	 */
	applyIfNoneAsync(applyIfNone: () => Promise<void>) : Promise<void> {
		if(!this._hasValue)
			return applyIfNone();
		return Promise.resolve();
	}

	/* Array */

	/**
	 * If the Option has an array value, the array is returned. Otherwise an empty array is returned
	 * @returns The Option's array or an empty array
	 */
	valueOrEmpty<T>(this: Option<T[]>) : T[] { return this._hasValue ? this._value as T[] : []; }

	/* Factories */

	/**
	 * Returns an Option that has the provided value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param value The value of the option.
	 * @returns An Option with a value.
	 */
	static some<TValue>(value: TValue) : Option<TValue> { return new Option<TValue>(true, value); }

	/**
	 * Returns an Option that has the provided value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param value The value of the option.
	 * @returns An Option with a value.
	 */
	static someAsync<TValue>(value: () => Promise<TValue>) : OptionPromise<TValue> { return new OptionPromise(value().then(value => Option.some(value))); }

	/**
	 * Returns an Option that has no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @returns An Option with no value.
	 */
	static none<TValue>() : Option<TValue> { return new Option<TValue>(false, undefined); }

	/**
	 * Returns an Option that has no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @returns An Option with no value.
	 */
	static noneAsync<TValue>() : OptionPromise<TValue> { return new OptionPromise<TValue>(Promise.resolve(new Option<TValue>(false, undefined))); }

	/**
	 * If the function passed as the first paramter resolves to true, returns an option with the value produced by the function passed in as the second parameter. Otherwise, returns an Option with no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param isSome A function that returns a boolean determining whether the Option has a value or is empty.
	 * @param valueFactory A function that produces the value of the option.
	 * @returns An Option with a value or no value depending on the result of the first paramter.
	 */
	static create<TValue>(isSome: () =>  boolean, valueFactory: () => TValue) : Option<TValue> { return isSome() ? new Option<TValue>(true, valueFactory()) : new Option<TValue>(false, undefined); }

	/**
	 * If the function passed as the first paramter resolves to true, returns an option with the value produced by the function passed in as the second parameter. Otherwise, returns an Option with no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param isSome A function that returns a boolean determining whether the Option has a value or is empty.
	 * @param valueFactory A function that produces the value of the option.
	 * @returns An Option with a value or no value depending on the result of the first paramter.
	 */
	static createAsync<TValue>(isSome: () => Promise<boolean>, valueFactory: () => Promise<TValue>) : OptionPromise<TValue> { return new OptionPromise(isSome().then(some => some ? valueFactory().then(value => new Option<TValue>(true, value)) : new Option<TValue>(false, undefined))); }

	/**
	 * If the value of the first paramter is null or defined, returns an Option with no value. Otherwise, returns an Option with the value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param value The value of the Option or `null`\`undefined` if the Option is empty.
	 * @returns An Option with a value or no value depending on if the provided value is null or undefined.
	 */
	static fromNullable<TValue>(value: TValue | null | undefined) : Option<TValue> { return value == null || value == undefined ? new Option<TValue>(false, undefined) : new Option<TValue>(true, value)}

	/**
	 * If the value of the function provided as the first parameter resolves to true, returns an `Option<Unit>` with some value. Otherwise, returns an Option with no value.
	 * @param isSuccess A function that returns a boolean determining whether the Option has a value or is empty.
	 * @returns An `Option<Unit>` that has some value or no value.
	 */
	static where(isSuccess: () => boolean) : Option<Unit> { return isSuccess() ? new Option(true, Unit) : new Option<Unit>(false, undefined); }

	/**
	 * Returns an `Option<Unit>` with a value.
	 * @returns An `Option<Unit>` with a value.
	 */
	static unit() : Option<Unit> { return new Option(true, Unit); }
	
	/**
	 * Combines multiple options into a an option with a tuple of values. If any of the options are empty, the returned option is also empty.
	 * @typeparam `T1` The first type.
	 * @typeparam `T2` The second type.
	 * @param opt1 The first option.
	 * @param opt2 The second option.
	 * @returns An Option with a tuple of values.
	 */
	static zip<T1, T2>(opt1: Option<T1>, opt2: Option<T2>) : Option<[T1, T2]>
	/**
	 * Combines multiple options into a an option with a tuple of values. If any of the options are empty, the returned option is also empty.
	 * @typeparam `T1` The first type.
	 * @typeparam `T2` The second type.
	 * @typeparam `T3` The third type.
	 * @param opt1 The first option.
	 * @param opt2 The second option.
	 * @param opt3 The third option.
	 * @returns An Option with a tuple of values.
	 */
	static zip<T1, T2, T3>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3>) : Option<[T1, T2, T3]>
	/**
	 * Combines multiple options into a an option with a tuple of values. If any of the options are empty, the returned option is also empty.
	 * @typeparam `T1` The first type.
	 * @typeparam `T2` The second type.
	 * @typeparam `T3` The third type.
	 * @typeparam `T4` The fourth type.
	 * @param opt1 The first option.
	 * @param opt2 The second option.
	 * @param opt3 The third option.
	 * @param opt4 The fourth option.
	 * @returns An Option with a tuple of values.
	 */
	static zip<T1, T2, T3, T4>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3>, opt4: Option<T4>) : Option<[T1, T2, T3, T4]>
	/**
	 * Combines multiple options into a an option with a tuple of values. If any of the options are empty, the returned option is also empty.
	 * @typeparam `T1` The first type.
	 * @typeparam `T2` The second type.
	 * @typeparam `T3` The third type.
	 * @typeparam `T4` The fourth type.
	 * @typeparam `T5` The fifth type.
	 * @param opt1 The first option.
	 * @param opt2 The second option.
	 * @param opt3 The third option.
	 * @param opt4 The fourth option.
	 * @param opt5 The fifth option.
	 * @returns An Option with a tuple of values.
	 */
	static zip<T1, T2, T3, T4, T5>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3>, opt4: Option<T4>, opt5: Option<T5>) : Option<[T1, T2, T3, T4, T5]>
	/**
	 * Combines multiple options into a an option with a tuple of values. If any of the options are empty, the returned option is also empty.
	 * @typeparam `T1` The first type.
	 * @typeparam `T2` The second type.
	 * @typeparam `T3` The third type.
	 * @typeparam `T4` The fourth type.
	 * @typeparam `T5` The fifth type.
	 * @typeparam `T6` The sixth type.
	 * @param opt1 The first option.
	 * @param opt2 The second option.
	 * @param opt3 The third option.
	 * @param opt4 The fourth option.
	 * @param opt5 The fifth option.
	 * @param opt6 The sixth option.
	 * @returns An Option with a tuple of values.
	 */
	static zip<T1, T2, T3, T4, T5, T6>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3>, opt4: Option<T4>, opt5: Option<T5>, opt6: Option<T6>) : Option<[T1, T2, T3, T4, T5, T6]>
	/**
	 * Combines multiple options into a an option with a tuple of values. If any of the options are empty, the returned option is also empty.
	 * @typeparam `T1` The first type.
	 * @typeparam `T2` The second type.
	 * @typeparam `T3` The third type.
	 * @typeparam `T4` The fourth type.
	 * @typeparam `T5` The fifth type.
	 * @typeparam `T6` The sixth type.
	 * @typeparam `T7` The seventh type.
	 * @param opt1 The first option.
	 * @param opt2 The second option.
	 * @param opt3 The third option.
	 * @param opt4 The fourth option.
	 * @param opt5 The fifth option.
	 * @param opt6 The sixth option.
	 * @param opt7 The seventh option.
	 * @returns An Option with a tuple of values.
	 */
	static zip<T1, T2, T3, T4, T5, T6, T7>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3>, opt4: Option<T4>, opt5: Option<T5>, opt6: Option<T6>, opt7: Option<T7>) : Option<[T1, T2, T3, T4, T5, T6, T7]>
	static zip<T1, T2, T3, T4, T5, T6, T7, T8>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3>, opt4: Option<T4>, opt5: Option<T5>, opt6: Option<T6>, opt7: Option<T7>, opt8: Option<T8>) : Option<[T1, T2, T3, T4, T5, T6, T7, T8]>
	static zip<T1, T2, T3, T4, T5, T6, T7, T8>(opt1: Option<T1>, opt2: Option<T2>, opt3: Option<T3> | undefined = undefined, opt4: Option<T4> | undefined = undefined, opt5: Option<T5> | undefined = undefined, opt6: Option<T6> | undefined  = undefined, opt7: Option<T7> | undefined = undefined, opt8: Option<T8> | undefined = undefined) {
		if(opt8) {
			return Option.create(
				() => opt1.hasValue() && opt2.hasValue() && (opt3?.hasValue() ?? false) && (opt4?.hasValue() ?? false) && (opt5?.hasValue() ?? false) && (opt6?.hasValue() ?? false) && (opt7?.hasValue() ?? false) && (opt8?.hasValue() ?? false),
				() => <[T1, T2, T3, T4, T5, T6, T7, T8]>[ opt1.valueOrUndefined() as T1, opt2.valueOrUndefined() as T2, opt3?.valueOrUndefined() as T3, opt4?.valueOrUndefined() as T4, opt5?.valueOrUndefined() as T5, opt6?.valueOrUndefined() as T6, opt7?.valueOrUndefined() as T7, opt8?.valueOrUndefined() as T8 ]);
		}
		if(opt7) {
			return Option.create(
				() => opt1.hasValue() && opt2.hasValue() && (opt3?.hasValue() ?? false) && (opt4?.hasValue() ?? false) && (opt5?.hasValue() ?? false) && (opt6?.hasValue() ?? false) && (opt7?.hasValue() ?? false),
				() => <[T1, T2, T3, T4, T5, T6, T7]>[ opt1.valueOrUndefined() as T1, opt2.valueOrUndefined() as T2, opt3?.valueOrUndefined() as T3, opt4?.valueOrUndefined() as T4, opt5?.valueOrUndefined() as T5, opt6?.valueOrUndefined() as T6, opt7?.valueOrUndefined() as T7 ]);
		}
		if(opt6) {
			return Option.create(
				() => opt1.hasValue() && opt2.hasValue() && (opt3?.hasValue() ?? false) && (opt4?.hasValue() ?? false) && (opt5?.hasValue() ?? false) && (opt6?.hasValue() ?? false),
				() => <[T1, T2, T3, T4, T5, T6]>[ opt1.valueOrUndefined() as T1, opt2?.valueOrUndefined() as T2, opt3?.valueOrUndefined() as T3, opt4?.valueOrUndefined() as T4, opt5?.valueOrUndefined() as T5, opt6?.valueOrUndefined() as T6 ]);
		}
		if(opt5) {
			return Option.create(
				() => opt1.hasValue() && opt2.hasValue() && (opt3?.hasValue() ?? false) && (opt4?.hasValue() ?? false) && (opt5?.hasValue() ?? false),
				() => <[T1, T2, T3, T4, T5]>[ opt1.valueOrUndefined() as T1, opt2?.valueOrUndefined() as T2, opt3?.valueOrUndefined() as T3, opt4?.valueOrUndefined() as T4, opt5?.valueOrUndefined() as T5 ]);
		}
		if(opt4) {
			return Option.create(
				() => opt1.hasValue() && opt2.hasValue() && (opt3?.hasValue() ?? false) && (opt4?.hasValue() ?? false),
				() => <[T1, T2, T3, T4]>[ opt1.valueOrUndefined() as T1, opt2?.valueOrUndefined() as T2, opt3?.valueOrUndefined() as T3, opt4?.valueOrUndefined() as T4 ]);
		}
		if(opt3) {
			return Option.create(
				() => opt1.hasValue() && opt2.hasValue() && (opt3?.hasValue() ?? false),
				() => <[T1, T2, T3]>[ opt1.valueOrUndefined() as T1, opt2?.valueOrUndefined() as T2, opt3?.valueOrUndefined() as T3 ]);
		}
		return Option.create(
			() => opt1.hasValue() && opt2.hasValue(),
			() => <[T1, T2]>[ opt1.valueOrUndefined() as T1, opt2?.valueOrUndefined() as T2 ]);
	}
}