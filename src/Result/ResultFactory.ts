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
const resultCreate = <TSuccess, TFailure = Error>(isSuccess: boolean, success: () => TSuccess, failure: () => TFailure) : Result<TSuccess, TFailure> =>
	isSuccess ? resultFromSuccess(success()) : resultFromFailure(failure());
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
const resultWhere = <TFailure = Error>(isSuccess: boolean, failureFactory: () => TFailure) : Result<Unit, TFailure> =>
	isSuccess ? resultUnit() : resultFromFailure(failureFactory());
const resultWhereAsync = <TFailure = Error>(isSuccess: () => Promise<boolean>, failureFactory: () => Promise<TFailure>) : ResultPromise<Unit, TFailure> =>
	resultPromiseFromResultAsync(isSuccess().then(is => is ? resultUnitAsync() : resultFromFailureAsync(failureFactory)));

export const ResultFactory = {
	success: resultFromSuccess,
	successAsync: resultFromSuccessAsync,
	failure: resultFromFailure,
	failureAsync: resultFromFailureAsync,
	create: resultCreate,
	createAsync: resultCreateAsync,
	try: resultTry,
	tryAsync: resultTryAsync,
	tryAction: resultTryAction,
	tryActionAsync: resultTryActionAsync,
	unit: resultUnit,
	unitAsync: resultUnitAsync,
	where: resultWhere,
	whereAsync: resultWhereAsync
}