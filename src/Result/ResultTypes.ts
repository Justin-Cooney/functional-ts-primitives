import { ResultPromise } from "./ResultPromiseTypes";
import { Option } from "../Option";

export type ResultMatchType<TSuccess, TFailure> = <T>(success: (some: TSuccess) => T, failure: (failure: TFailure) => T) => T;
export type ResultMatchAsyncType<TSuccess, TFailure> = <T>(success: (some: TSuccess) => Promise<T>, failure: (failure: TFailure) => Promise<T>) => Promise<T>;
export type ResultToStringType = () => string;
export type ResultIsSuccessType = () => boolean;
export type ResultToPromiseType<TSuccess, TFailure> = () => ResultPromise<TSuccess, TFailure>
export type ResultSuccessType<TSuccess> = () => Option<TSuccess>
export type ResultFailureType<TFailure> = () => Option<TFailure>
export type ResultMapType<TSuccess, TFailure> = <TResult>(map: (success: TSuccess) => TResult) => Result<TResult, TFailure>
export type ResultMapAsyncType<TSuccess, TFailure> = <TResult>(map: (success: TSuccess) => Promise<TResult>) => ResultPromise<TResult, TFailure>
export type ResultMapFailureType<TSuccess, TFailure> = <TMapFailure>(mapFailure: (failure: TFailure) => TMapFailure) => Result<TSuccess, TMapFailure>
export type ResultMapFailureAsyncType<TSuccess, TFailure> = <TMapFailure>(mapFailure: (failure: TFailure) => Promise<TMapFailure>) => ResultPromise<TSuccess, TMapFailure>
export type ResultTryMapType<TSuccess, TFailure> = {
	<TResult, TMapFailure extends TFailure = TFailure>(map: (success: TSuccess) => TResult, mapFailure: (error: Error) => TFailure) : Result<TResult, TFailure>;
	<TResult, TError extends TFailure & Error>(map: (success: TSuccess) => TResult) : Result<TResult, TFailure | Error>;
}
export type ResultTryMapAsyncType<TSuccess, TFailure> = {
	<TResult, TMapFailure extends TFailure = TFailure>(mapAsync: (success: TSuccess) => Promise<TResult>, mapFailure: (error: Error) => Promise<TFailure>) : ResultPromise<TResult, TFailure>;
	<TResult, TError extends TFailure & Error>(mapAsync: (success: TSuccess) => Promise<TResult>) : ResultPromise<TResult, TFailure | Error>;
}
export type ResultBindType<TSuccess, TFailure> = <TResult>(bind: (success: TSuccess) => Result<TResult, TFailure>) => Result<TResult, TFailure>
export type ResultBindAsyncType<TSuccess, TFailure> = <TResult>(bind: (success: TSuccess) => Promise<Result<TResult, TFailure>>) => ResultPromise<TResult, TFailure>
export type ResultBindFailureType<TSuccess, TFailure> = <TResult>(bindFailure: (failure: TFailure) => Result<TSuccess, TResult>) => Result<TSuccess, TResult>
export type ResultBindFailureAsyncType<TSuccess, TFailure> = <TResult>(bindFailure: (failure: TFailure) => Promise<Result<TSuccess, TResult>>) => ResultPromise<TSuccess, TResult>
export type ResultWhereType<TSuccess, TFailure> = (predicate: (success: TSuccess) => boolean, failureFactory: (success: TSuccess) => TFailure) => Result<TSuccess, TFailure>
export type ResultWhereAsyncType<TSuccess, TFailure> = (predicate: (success: TSuccess) => Promise<boolean>, failureFactory: (success: TSuccess) => Promise<TFailure>) => ResultPromise<TSuccess, TFailure>
export type ResultDoType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) => Result<TSuccess, TFailure>
export type ResultDoAsyncType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultDoAlwaysType<TSuccess, TFailure> = (doAction: () => void) => Result<TSuccess, TFailure>
export type ResultDoAlwaysAsyncType<TSuccess, TFailure> = (doAction: () => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultDoIfSuccessfulType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => void) => Result<TSuccess, TFailure>
export type ResultDoIfSuccessfulAsyncType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultDoIfFailureType<TSuccess, TFailure> = (doIfFailure: (failure: TFailure) => void) => Result<TSuccess, TFailure>
export type ResultDoIfFailureAsyncType<TSuccess, TFailure> = (doIfFailure: (failure: TFailure) => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultApplyType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) => void
export type ResultApplyAsyncType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) => Promise<void>
export type ResultApplyAlwaysType<TSuccess, TFailure> = (doAction: () => void) => void
export type ResultApplyAlwaysAsyncType<TSuccess, TFailure> = (doAction: () => Promise<void>) => Promise<void>
export type ResultApplyIfSuccessfulType<TSuccess> = (doIfSuccess: (success: TSuccess) => void) => void
export type ResultApplyIfSuccessfulAsyncType<TSuccess> = (doIfSuccess: (success: TSuccess) => Promise<void>) => Promise<void>
export type ResultApplyIfFailureType<TFailure> = (doIfFailure: (failure: TFailure) => void) => void
export type ResultApplyIfFailureAsyncType<TFailure> = (doIfFailure: (failure: TFailure) => Promise<void>) => Promise<void>

/**
 * Represents an object that either has a successful value or a failure value resulting from some operation.
 * @typeparam `TSuccess` - Type of object the Result contains if the operation was successful.
 * @typeparam `TFailure` - Type of object the Result contains if the operation was a failure.
 */
export type Result<TSuccess, TFailure> = {

	/**
	 * If the Result has a success value, then the function in the first parameter is invoked with the success value and its result is returned. If the Result has a failure value, then the function in the second parameter is invoked with the value failure and its result is returned.
	 * @param success A function that is executed if the Result has a success value.
	 * @param failure A function that is executed if the Result has a failure value.
	 * @returns The result of the appropriate function.
	 */
	match: ResultMatchType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, then the function in the first parameter is invoked with the success value and its result is returned. If the Result has a failure value, then the function in the second parameter is invoked with the value failure and its result is returned.
	 * @param success A function that is executed if the Result has a success value.
	 * @param failure A function that is executed if the Result has a failure value.
	 * @returns The result of the appropriate function.
	 */
	matchAsync: ResultMatchAsyncType<TSuccess, TFailure>,

	/**
	 * Returns a string representing the content of the Result.
	 * @returns `Success: ${success}` if the Result contains a successful value or `Failure ${failure}` if the Result contains a failure value.
	 */
	toString: ResultToStringType,

	/**
	 * If the Result has a successful value, this extension will return `true`. If the Result has a failure value then it will return `false`.
	 * @returns A boolean representing whether the Result has a successful value or not.
	 */
	isSuccess: ResultIsSuccessType,

	/**
	 * Returns the Result as a ResultPromise.
	 * @returns The Result as a `ResultPromise<TSuccess, TFailure>`.
	 */
	toPromise: ResultToPromiseType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns an Option with the success value. If the Result has a failure value then returns an empty Option.
	 * @returns An `Option<TSuccess>` with the success value or no value.
	 */
	success: ResultSuccessType<TSuccess>,

	/**
	 * If the Result has a success value, returns an Option with no value. If the Result has a failure value then returns an Option with the failure value.
	 * @returns An `Option<TFailure>` with the failure value or no value.
	 */
	failure: ResultFailureType<TFailure>,

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The value type of the returned Option.
	 * @param map A function that maps the success value to a new value if the Result has a success value.
	 * @returns A Result that contains the mapped value or the original failure value.
	 */
	map: ResultMapType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The new success type of the returned Result.
	 * @param map A function that maps the success value to a new value if the Result has a success value.
	 * @returns A Result that contains the mapped value or the original failure value.
	 */
	mapAsync: ResultMapAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a new `Result<TSuccess, TMapFailure>` with the success value. If the Result has a failure value, returns a `Result<TSuccess, TMapFailure>` with the result generated by the function passed in as the first argument.
	 * @typeparam `TMapFailure` The new failure type of the returned Result.
	 * @param map A function that maps the failure value to a new value if the Result has a failure value.
	 * @returns A Result that contains the mapped failure value or the original success value.
	 */
	mapFailure: ResultMapFailureType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a new `Result<TSuccess, TMapFailure>` with the success value. If the Result has a failure value, returns a `Result<TSuccess, TMapFailure>` with the result generated by the function passed in as the first argument.
	 * @typeparam `TMapFailure` The new failure type of the returned Result.
	 * @param map A function that maps the failure value to a new value if the Result has a failure value.
	 * @returns A Result that contains the mapped failure value or the original success value.
	 */
	mapFailureAsync: ResultMapFailureAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the function throws an error the error will be mapped to a failure value by the funciton passed in as the second argument. If the Result contains a failure value returns a new result with the failure value.
	 * @param map A function that maps the success value to a new value if the Result has a success value. This function has the potential to throw an Error.
	 * @param mapFailure A function that maps any Errors thrown by the map function to the Result's failure type.
	 * @returns A result that contains the mapped success value or a failure value.
	 */
	tryMap: ResultTryMapType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the function throws an error the error will be mapped to a failure value by the funciton passed in as the second argument. If the Result contains a failure value returns a new result with the failure value.
	 * @param map A function that maps the success value to a new value if the Result has a success value. This function has the potential to throw an Error.
	 * @param mapFailure A function that maps any Errors thrown by the map function to the Result's failure type.
	 * @returns A result that contains the mapped success value or a failure value.
	 */
	tryMapAsync: ResultTryMapAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns the `Result<TResult, TFailure>` generated by the bind function passed in the first parameter. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The new success type of the returned Result.
	 * @param bind A function that maps the current success value to a new `Result<TResult, TFailure>` if the Result has a success value.
	 * @returns A `Result<TResult, TFailure>` that has been generated by the bind function or has the original failure value.
	 */
	bind: ResultBindType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns the `Result<TResult, TFailure>` generated by the bind function passed in the first parameter. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.
	 * @typeparam `TResult` The new success type of the returned Result.
	 * @param bind A function that maps the current success value to a new `Result<TResult, TFailure>` if the Result has a success value.
	 * @returns A `Result<TResult, TFailure>` that has been generated by the bind function or has the original failure value.
	 */
	bindAsync: ResultBindAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a `Result<TSuccess, TResult>` If the Result has a failure value, returns a `Result<TSuccess, TResult>` generated by the bind function passed in the first parameter. 
	 * @typeparam `TResult` The new failure type of the returned Result.
	 * @param bind A function that maps the current failure value to a new `Result<TSuccess, TResult>` if the Result has a failure value.
	 * @returns A `Result<TSuccess, TResult>` that has been generated by the bind function or has the original success value.
	 */
	bindOnFailure: ResultBindFailureType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, returns a `Result<TSuccess, TResult>` If the Result has a failure value, returns a `Result<TSuccess, TResult>` generated by the bind function passed in the first parameter. 
	 * @typeparam `TResult` The new failure type of the returned Result.
	 * @param bind A function that maps the current failure value to a new `Result<TSuccess, TResult>` if the Result has a failure value.
	 * @returns A `Result<TSuccess, TResult>` that has been generated by the bind function or has the original success value.
	 */
	bindOnFailureAsync: ResultBindFailureAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value and the predicate function is true, returns a Result with the original success value. If the Result has a success value and the predicate function is false, returns a result with the failure generated by the function passed into the second parameter. Otherwise, returns a Result with the original failure value.
	 * @param predicate A function that maps the Result's  success value to a boolean representing whether the returned value is a success or failure value.
	 * @param failureFactory A function that converts the success value into a failure value if the predicate resolves to false.
	 * @returns A result with the success value or failure value depending on the result of the predicate.
	 */
	where: ResultWhereType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value and the predicate function is true, returns a Result with the original success value. If the Result has a success value and the predicate function is false, returns a result with the failure generated by the function passed into the second parameter. Otherwise, returns a Result with the original failure value.
	 * @param predicate A function that maps the Result's  success value to a boolean representing whether the returned value is a success or failure value.
	 * @param failureFactory A function that converts the success value into a failure value if the predicate resolves to false.
	 * @returns A result with the success value or failure value depending on the result of the predicate.
	 */
	whereAsync: ResultWhereAsyncType<TSuccess, TFailure>

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	do: ResultDoType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	doAsync: ResultDoAsyncType<TSuccess, TFailure>,

	/**
	 * Performs the function provided as the first parameter and returns the original Result.
	 * @param doAction The function to be executed.
	 * @returns The original Result.
	 */
	doAlways: ResultDoAlwaysType<TSuccess, TFailure>,

	/**
	 * Performs the function provided as the first parameter and returns the original Result.
	 * @param doAction The function to be executed.
	 * @returns The original Result.
	 */
	doAlwaysAsync: ResultDoAlwaysAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @returns The original Result.
	 */
	doIfSuccessful: ResultDoIfSuccessfulType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @returns The original Result.
	 */
	doIfSuccessfulAsync: ResultDoIfSuccessfulAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	doIfFailure: ResultDoIfFailureType<TSuccess, TFailure>,

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter. The original Result is always returned.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 * @returns The original Result.
	 */
	doIfFailureAsync: ResultDoIfFailureAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	apply: ResultApplyType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	applyAsync: ResultApplyAsyncType<TSuccess, TFailure>,

	/**
	 * Performs the function provided as the first parameter.
	 * @param doAction The function to be executed.
	 */
	applyAlways: ResultApplyAlwaysType<TSuccess, TFailure>,

	/**
	 * Performs the function provided as the first parameter.
	 * @param doAction The function to be executed.
	 */
	applyAlwaysAsync: ResultApplyAlwaysAsyncType<TSuccess, TFailure>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 */
	applyIfSuccessful: ResultApplyIfSuccessfulType<TSuccess>,

	/**
	 * If the Result has a success value, performs the function provided as the first parameter.
	 * @param doIfSuccess The function to be executed if the Result has a success value.
	 */
	applyIfSuccessfulAsync: ResultApplyIfSuccessfulAsyncType<TSuccess>,

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	applyIfFailure: ResultApplyIfFailureType<TFailure>,

	/**
	 * If the Result has a failure value, performs the function provided as the first parameter.
	 * @param doIfFailure The function to be executed if the Result has a failure value.
	 */
	applyIfFailureAsync: ResultApplyIfFailureAsyncType<TFailure>,
}