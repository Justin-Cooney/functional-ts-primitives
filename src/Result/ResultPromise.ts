import { Result, OptionPromise } from "../index";

export class ResultPromise<TSuccess, TFailure> implements Promise<Result<TSuccess, TFailure>> {
	constructor(private readonly _promise: Promise<Result<TSuccess, TFailure>>) {
		this[Symbol.toStringTag] = _promise[Symbol.toStringTag];
	}
	
	then<TResult1 = Result<TSuccess, TFailure>, TResult2 = never>(onfulfilled?: ((value: Result<TSuccess, TFailure>) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
		return this._promise.then(onfulfilled, onrejected);
	}

	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<Result<TSuccess, TFailure> | TResult> {
		return this._promise.catch(onrejected);
	}

	toOptionPromise<TValue>(this: Promise<import("..").Option<TValue>>): OptionPromise<TValue> { throw new Error("Method not implemented."); }
	toResultPromise<TSuccess, TFailure>(this: Promise<Result<TSuccess, TFailure>>): ResultPromise<TSuccess, TFailure> {
		return this as ResultPromise<TSuccess, TFailure>;
	}

	[Symbol.toStringTag]: string;

	finally(onfinally?: (() => void) | null | undefined): Promise<Result<TSuccess, TFailure>> {
		return this._promise.finally(onfinally);
	}

	/**
	 * Returns a string representing the content of the Result.
	 * @returns `Success: ${success}` if the Result contains a successful value or `Failure ${failure}` if the Result contains a failure value.
	 */
	toStringAsync() : Promise<string> { return this.then(result => result.toString()); }

	/**
	 * If the Result has a successful value, this extension will return `true`. If the Result has a failure value then it will return `false`.
	 * @returns A boolean representing whether the Result has a successful value or not.
	 */
	isSuccess() : Promise<boolean> { return this.then(result => result.isSuccess()); }

	/**
	 * If the Result has a success value, returns an Option with the success value. If the Result has a failure value then returns an empty Option.
	 * @returns An `Option<TSuccess>` with the success value or no value.
	 */
	success() : OptionPromise<TSuccess> { return new OptionPromise(this.then(result => result.success())); }

	/**
	 * If the Result has a success value, returns an Option with no value. If the Result has a failure value then returns an Option with the failure value.
	 * @returns An `Option<TFailure>` with the failure value or no value.
	 */
	failure() : OptionPromise<TFailure> { return new OptionPromise(this.then(result => result.failure())); }

	/**
	 * If the Result has a success value, then the function in the first parameter is invoked with the success value and its result is returned. If the Result has a failure value, then the function in the second parameter is invoked with the value failure and its result is returned.
	 * @param success A function that is executed if the Result has a success value.
	 * @param failure A function that is executed if the Result has a failure value.
	 * @returns The result of the appropriate function.
	 */
	match<T>(success: (some: TSuccess) => T, failure: (failure: TFailure) => T) : Promise<T> { return this.then(result => result.match(success, failure)); }

	/**
	 * If the Result has a success value, then the function in the first parameter is invoked with the success value and its result is returned. If the Result has a failure value, then the function in the second parameter is invoked with the value failure and its result is returned.
	 * @param success A function that is executed if the Result has a success value.
	 * @param failure A function that is executed if the Result has a failure value.
	 * @returns The result of the appropriate function.
	 */
	matchAsync<T>(success: (some: TSuccess) => Promise<T>, failure: (failure: TFailure) => Promise<T>) : Promise<T> { return this.then(result => result.matchAsync(success, failure)); }

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the success value to a new value if the Result has a success value.
	 * @returns A Result that contains the mapped value or the original failure value.
	 */
	map<TResult>(map: (success: TSuccess) => TResult) : ResultPromise<TResult, TFailure> { return new ResultPromise(this.then(result => result.map(map))); }

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The new success type of the returned Result.
	 * @param map A function that maps the success value to a new value if the Result has a success value.
	 * @returns A Result that contains the mapped value or the original failure value.
	 */
	mapAsync<TResult>(map: (success: TSuccess) => Promise<TResult>) : ResultPromise<TResult, TFailure>  { return new ResultPromise(this.then(result => result.mapAsync(map))); }

	/**
	 * If the Result has a success value, returns a new `Result<TSuccess, TMapFailure>` with the success value. If the Result has a failure value, returns a `Result<TSuccess, TMapFailure>` with the result generated by the function passed in as the first argument.
	 * @typeparam `TMapFailure` The new failure type of the returned Result.
	 * @param map A function that maps the failure value to a new value if the Result has a failure value.
	 * @returns A Result that contains the mapped failure value or the original success value.
	 */
	mapFailure<TMapFailure>(mapFailure: (failure: TFailure) => TMapFailure) : ResultPromise<TSuccess, TMapFailure> { return new ResultPromise(this.then(result => result.mapFailure(mapFailure))); }

	/**
	 * If the Result has a success value, returns a new `Result<TSuccess, TMapFailure>` with the success value. If the Result has a failure value, returns a `Result<TSuccess, TMapFailure>` with the result generated by the function passed in as the first argument.
	 * @typeparam `TMapFailure` The new failure type of the returned Result.
	 * @param map A function that maps the failure value to a new value if the Result has a failure value.
	 * @returns A Result that contains the mapped failure value or the original success value.
	 */
	mapFailureAsync<TMapFailure>(mapFailure: (failure: TFailure) => Promise<TMapFailure>) : ResultPromise<TSuccess, TMapFailure> { return new ResultPromise(this.then(result => result.mapFailureAsync(mapFailure))); }

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the function throws an error the error will be mapped to a failure value by the funciton passed in as the second argument. If the Result contains a failure value returns a new result with the failure value.
	 * @param map A function that maps the success value to a new value if the Result has a success value. This function has the potential to throw an Error.
	 * @param mapFailure A function that maps any Errors thrown by the map function to the Result's failure type.
	 * @returns A result that contains the mapped success value or a failure value.
	 */
	tryMap<TResult>(map: (success: TSuccess) => TResult) : ResultPromise<TResult, Error | TFailure>
	tryMap<TResult>(map: (success: TSuccess) => TResult, mapFailure: ((error: Error) => TFailure) | null) : ResultPromise<TResult, TFailure>
	tryMap<TResult>(map: (success: TSuccess) => TResult, mapFailure: ((error: Error) => TFailure) | null = null)
	{ return new ResultPromise(this.then(result => result.tryMap(map, mapFailure))); }

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the function throws an error the error will be mapped to a failure value by the funciton passed in as the second argument. If the Result contains a failure value returns a new result with the failure value.
	 * @param map A function that maps the success value to a new value if the Result has a success value. This function has the potential to throw an Error.
	 * @param mapFailure A function that maps any Errors thrown by the map function to the Result's failure type.
	 * @returns A result that contains the mapped success value or a failure value.
	 */
	tryMapAsync<TResult>(map: (success: TSuccess) => Promise<TResult>) : ResultPromise<TResult, Error | TFailure>
	tryMapAsync<TResult>(map: (success: TSuccess) => Promise<TResult>, mapFailure: ((error: Error) => Promise<TFailure>) | null) : ResultPromise<TResult, TFailure>
	tryMapAsync<TResult>(map: (success: TSuccess) => Promise<TResult>, mapFailure: ((error: Error) => Promise<TFailure>) | null = null)
	{ return new ResultPromise(this.then(result => result.tryMapAsync(map, mapFailure))); }

	/**
	 * If the Result has a success value, returns the `Result<TResult, TFailure>` generated by the bind function passed in the first parameter. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The new success type of the returned Result.
	 * @param bind A function that maps the current success value to a new `Result<TResult, TFailure>` if the Result has a success value.
	 * @returns A `Result<TResult, TFailure>` that has been generated by the bind function or has the original failure value.
	 */
	bind<TResult>(bind: (success: TSuccess) => Result<TResult, TFailure>) : ResultPromise<TResult, TFailure> { return new ResultPromise(this.then(result => result.bind(bind))); }

	/**
	 * If the Result has a success value, returns the `Result<TResult, TFailure>` generated by the bind function passed in the first parameter. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The new success type of the returned Result.
	 * @param bind A function that maps the current success value to a new `Result<TResult, TFailure>` if the Result has a success value.
	 * @returns A `Result<TResult, TFailure>` that has been generated by the bind function or has the original failure value.
	 */
	bindAsync<TResult>(bind: (success: TSuccess) => Promise<Result<TResult, TFailure>>) : ResultPromise<TResult, TFailure> { return new ResultPromise(this.then(result => result.bindAsync(bind))); }

	/**
	 * If the Result has a success value, returns a `Result<TSuccess, TResult>` If the Result has a failure value, returns a `Result<TSuccess, TResult>` generated by the bind function passed in the first parameter. 
	 * @typeparam `TResult` The new failure type of the returned Result.
	 * @param bind A function that maps the current failure value to a new `Result<TSuccess, TResult>` if the Result has a failure value.
	 * @returns A `Result<TSuccess, TResult>` that has been generated by the bind function or has the original success value.
	 */
	bindOnFailure<TResult>(bindFailure: (failure: TFailure) => Result<TSuccess, TResult>) : ResultPromise<TSuccess, TResult> { return new ResultPromise(this.then(result => result.bindOnFailure(bindFailure))); }

	/**
	 * If the Result has a success value, returns a `Result<TSuccess, TResult>` If the Result has a failure value, returns a `Result<TSuccess, TResult>` generated by the bind function passed in the first parameter. 
	 * @typeparam `TResult` The new failure type of the returned Result.
	 * @param bind A function that maps the current failure value to a new `Result<TSuccess, TResult>` if the Result has a failure value.
	 * @returns A `Result<TSuccess, TResult>` that has been generated by the bind function or has the original success value.
	 */
	bindOnFailureAsync<TResult>(bindFailure: (failure: TFailure) => Promise<Result<TSuccess, TResult>>) : ResultPromise<TSuccess, TResult> { return new ResultPromise(this.then(result => result.bindOnFailureAsync(bindFailure))); }

	/**
	 * If the Result has a success value and the predicate function is true, returns a Result with the original success value. If the Result has a success value and the predicate function is false, returns a result with the failure generated by the function passed into the second parameter. Otherwise, returns a Result with the original failure value.
	 * @param predicate A function that maps the Result's  success value to a boolean representing whether the returned value is a success or failure value.
	 * @param failureFactory A function that converts the success value into a failure value if the predicate resolves to false.
	 * @returns A result with the success value or failure value depending on the result of the predicate.
	 */
	where(predicate: (success: TSuccess) => boolean, failureFactory: (success: TSuccess) => TFailure) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.where(predicate, failureFactory))); }

	/**
	 * If the Result has a success value and the predicate function is true, returns a Result with the original success value. If the Result has a success value and the predicate function is false, returns a result with the failure generated by the function passed into the second parameter. Otherwise, returns a Result with the original failure value.
	 * @param predicate A function that maps the Result's  success value to a boolean representing whether the returned value is a success or failure value.
	 * @param failureFactory A function that converts the success value into a failure value if the predicate resolves to false.
	 * @returns A result with the success value or failure value depending on the result of the predicate.
	 */
	whereAsync(predicate: (success: TSuccess) => Promise<boolean>, failureFactory: (success: TSuccess) => Promise<TFailure>) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.whereAsync(predicate, failureFactory))); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	do(doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.do(doIfSuccess, doIfFailure))); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	doAsync(doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doAsync(doIfSuccess, doIfFailure))); }

	/**
	 * Performs the function provided as the first parameter and returns the original Result.
	 * @param doAction The function to be executed.
	 * @returns The original Result.
	 */
	doAlways(doAction: () => void) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doAlways(doAction))); }

	/**
	 * Performs the function provided as the first parameter and returns the original Result.
	 * @param doAction The function to be executed.
	 * @returns The original Result.
	 */
	doAlwaysAsync(doAction: () => Promise<void>) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doAlwaysAsync(doAction))); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @returns The original Result.
	 */
	doIfSuccessful(doIfSuccess: (success: TSuccess) => void) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doIfSuccessful(doIfSuccess))); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @returns The original Result.
	 */
	doIfSuccessfulAsync(doIfSuccess: (success: TSuccess) => Promise<void>) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doIfSuccessfulAsync(doIfSuccess))); }

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	doIfFailure(doIfFailure: (failure: TFailure) => void) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doIfFailure(doIfFailure))); }

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	doIfFailureAsync(doIfFailure: (failure: TFailure) => Promise<void>) : ResultPromise<TSuccess, TFailure> { return new ResultPromise(this.then(result => result.doIfFailureAsync(doIfFailure))); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	apply(doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) : Promise<void> { return this.then(result => result.apply(doIfSuccess, doIfFailure)); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	applyAsync(doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) : Promise<void> { return this.then(result => result.applyAsync(doIfSuccess, doIfFailure)); }

	/**
	 * Performs the function provided as the first parameter.
	 * @param doAction The function to be executed.
	 */
	applyAlways(doAction: () => void) : Promise<void> { return this.then(result => result.applyAlways(doAction)); }

	/**
	 * Performs the function provided as the first parameter.
	 * @param doAction The function to be executed.
	 */
	applyAlwaysAsync(doAction: () => Promise<void>) : Promise<void> { return doAction(); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 */
	applyIfSuccessful(doIfSuccess: (success: TSuccess) => void) : Promise<void> { return this.then(result => result.applyIfSuccessful(doIfSuccess)); }

	/**
	 * If the Result has a success value, performs the function provided as the first parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 */
	applyIfSuccessfulAsync(doIfSuccess: (success: TSuccess) => Promise<void>) : Promise<void> { return this.then(result => result.applyIfSuccessfulAsync(doIfSuccess)); }

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	applyIfFailure(doIfFailure: (failure: TFailure) => void) : Promise<void> { return this.then(result => result.applyIfFailure(doIfFailure)); }

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	applyIfFailureAsync(doIfFailure: (failure: TFailure) => Promise<void>) : Promise<void> { return this.then(result => result.applyIfFailureAsync(doIfFailure)); }
}