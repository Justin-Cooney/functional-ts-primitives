import { resultFromMatch } from "./Result"
import { Result } from "./ResultTypes";
import { ResultPromise } from "./ResultPromiseTypes";
import { resultPromiseFromResultAsync } from "./ResultPromise";
import { Unit } from "../Unit";
import { toString } from "./ResultExtensions";

const resultErrorFromAny = <TSuccess>(error: any) : Result<TSuccess, Error> => {
	if(error instanceof Error)
		return resultFromFailure(error);
	else if(typeof error === 'string' || typeof error === 'number' || typeof error === 'boolean' || error instanceof String || error instanceof Object)
		return resultFromFailure(new Error(error.toString()));
	return resultFromFailure(new Error("An unparsable error was thrown from ResultFactory"));
}

const resultFromSuccess = <TSuccess, TFailure = Error>(success: TSuccess) : Result<TSuccess, TFailure> =>
	resultFromMatch((ifSuccess, ifFailure) => ifSuccess(success));
const resultFromSuccessAsync = <TSuccess, TFailure = Error>(success: () => Promise<TSuccess>) : ResultPromise<TSuccess, TFailure> =>
	resultPromiseFromResultAsync(success().then(value => resultFromSuccess(value)));
const resultFromFailure = <TSuccess, TFailure = Error>(failure: TFailure) : Result<TSuccess, TFailure> =>
	resultFromMatch((ifSuccess, ifFailure) => ifFailure(failure));
const resultFromFailureAsync = <TSuccess, TFailure = Error>(failure: () => Promise<TFailure>) : ResultPromise<TSuccess, TFailure>  =>
	resultPromiseFromResultAsync(failure().then(value => resultFromFailure(value)));
const resultCreate = <TSuccess, TFailure = Error>(isSuccess: () => boolean, success: () => TSuccess, failure: () => TFailure) : Result<TSuccess, TFailure> =>
	isSuccess() ? resultFromSuccess(success()) : resultFromFailure(failure());
const resultCreateAsync = <TSuccess, TFailure = Error>(isSuccess: () => Promise<boolean>, success: () => Promise<TSuccess>, failure: () => Promise<TFailure>) : ResultPromise<TSuccess, TFailure> =>
	resultPromiseFromResultAsync(isSuccess().then(is => is ? resultFromSuccessAsync(() => success()) : resultFromFailureAsync(() => failure())));
const resultTry = <TSuccess>(successFactory: () => TSuccess) : Result<TSuccess, Error> => {
	try {
		return resultFromSuccess(successFactory());
	}
	catch(error) {
		return resultErrorFromAny(error);
	}
}
const resultTryAsync = <TSuccess>(successFactory: () => Promise<TSuccess>) : ResultPromise<TSuccess, Error> => 
	resultPromiseFromResultAsync(successFactory().then(success => resultFromSuccess(success), failure => resultErrorFromAny(failure)));
const resultTryAction = (action: () => void) : Result<Unit, Error> => {
	try {
		action();
		return resultUnit();
	}
	catch(error) {
		return resultErrorFromAny(error);
	}
}
const resultTryActionAsync = (action: () => Promise<void>) : ResultPromise<Unit, Error> =>
	resultPromiseFromResultAsync(action().then(success => resultUnit(), failure => resultErrorFromAny(failure)));
const resultUnit = <TFailure = Error>() : Result<Unit, TFailure> =>
	resultFromSuccess(Unit);
const resultUnitAsync = <TFailure = Error>() : ResultPromise<Unit, TFailure> =>
	resultFromSuccessAsync<Unit, TFailure>(async () => Unit);
const resultWhere = <TFailure = Error>(isSuccess: () => boolean, failureFactory: () => TFailure) : Result<Unit, TFailure> =>
	isSuccess() ? resultUnit() : resultFromFailure(failureFactory());
const resultWhereAsync = <TFailure = Error>(isSuccess: () => Promise<boolean>, failureFactory: () => Promise<TFailure>) : ResultPromise<Unit, TFailure> =>
	resultPromiseFromResultAsync(isSuccess().then(is => is ? resultUnitAsync() : resultFromFailureAsync(failureFactory)));

export const ResultFactory = {
	/**
	 * Returns a Result with a successful value.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param success The value of the result.
	 * @returns A Result with a successful value.
	 */
	success: resultFromSuccess,

	/**
	 * Returns a Result with a successful value.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param success The successful value of the result.
	 * @returns A Result with a successful value.
	 */
	successAsync: resultFromSuccessAsync,

	/**
	 * Returns a Result with a failure value.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param failure The failure value of the result.
	 * @returns A Result with a failure value.
	 */
	failure: resultFromFailure,

	/**
	 * Returns a Result with a failure value.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param failure The failure value of the result.
	 * @returns A Result with a failure value.
	 */
	failureAsync: resultFromFailureAsync,

	/**
	 * If the function passed in as the first argument resolves to true, returns a Result with a succesful value. Otherwise, returns a result with a failure value.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param isSuccess A function that returns a boolean that determines if the Result is produced with a success value or failure value.
	 * @param success A function that produces the success value of the result.
	 * @param failure A function that produces the failure value of the result.
	 * @returns A Result with either a success value or a failure value.
	 */
	create: resultCreate,

	/**
	 * If the function passed in as the first argument resolves to true, returns a Result with a succesful value. Otherwise, returns a result with a failure value.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param isSuccess A function that returns a boolean that determines if the Result is produced with a success value or failure value.
	 * @param success A function that produces the success value of the result.
	 * @param failure A function that produces the failure value of the result.
	 * @returns A Result with either a success value or a failure value.
	 */
	createAsync: resultCreateAsync,

	/**
	 * Executes the function provided as the first parameter. If the function returns a value then the value is returned as a succesful Result. If the function throws an error, then the error is returned as a failure Result.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @param successFactory A function that produces the success value of the result.
	 * @returns A Result with either a success value or an Error failure value.
	 */
	try: resultTry,

	/**
	 * Executes the function provided as the first parameter. If the function returns a value then the value is returned as a succesful Result. If the function throws an error, then the error is returned as a failure Result.
	 * @typeparam TSuccess The type of the Result's success value.
	 * @param successFactory A function that produces the success value of the result.
	 * @returns A Result with either a success value or an Error failure value.
	 */
	tryAsync: resultTryAsync,

	/**
	 * Executes the function provided as the first parameter. If the function executes without errors then a succesful Result is returned. If the function throws an error, then the error is returned as a failure Result.
	 * @param action A function that produces the success value of the result.
	 * @returns A Result with either a Unit success value or an Error failure value.
	 */
	tryAction: resultTryAction,

	/**
	 * Executes the function provided as the first parameter. If the function executes without errors then a succesful Result is returned. If the function throws an error, then the error is returned as a failure Result.
	 * @param action A function that produces the success value of the result.
	 * @returns A Result with either a Unit success value or an Error failure value.
	 */
	tryActionAsync: resultTryActionAsync,

	/**
	 * Returns a Result with a succesful Unit as its value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @returns A Result with a succesful Unit value.
	 */
	unit: resultUnit,

	/**
	 * Returns a Result with a succesful Unit as its value.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @returns A Result with a succesful Unit value.
	 */
	unitAsync: resultUnitAsync,

	/**
	 * If the function passed in as the first argument resolves to true, returns a successful Unit Result. If it resolves to false, returns a failure Result with the value produced by the function in the second parameter.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param isSuccess A function that returns a boolean that determines if the Result is produced with a success value or failure value.
	 * @param failureFactory A function that produces a failure result in the case a failure is returned.
	 * @returns A Result with a successful Unit value or a failure value produced by the failure factory.
	 */
	where: resultWhere,

	/**
	 * If the function passed in as the first argument resolves to true, returns a successful Unit Result. If it resolves to false, returns a failure Result with the value produced by the function in the second parameter.
	 * @typeparam TFailure The type of the Result's failure value.
	 * @param isSuccess A function that returns a boolean that determines if the Result is produced with a success value or failure value.
	 * @param failureFactory A function that produces a failure result in the case a failure is returned.
	 * @returns A Result with a successful Unit value or a failure value produced by the failure factory.
	 */
	whereAsync: resultWhereAsync
}