import { ResultMatchType, ResultMatchAsyncType, ResultToStringType, ResultIsSuccessType, ResultToPromiseType, ResultSuccessType, ResultMapType, ResultMapAsyncType, ResultMapFailureAsyncType, ResultMapFailureType, ResultTryMapType, Result, ResultTryMapAsyncType, ResultBindType, ResultBindAsyncType, ResultBindFailureType, ResultBindFailureAsyncType, ResultWhereType, ResultWhereAsyncType, ResultDoType, ResultDoAsyncType, ResultDoIfSuccessfulType, ResultDoIfSuccessfulAsyncType, ResultDoIfFailureType, ResultDoIfFailureAsyncType, ResultDoAlwaysType, ResultDoAlwaysAsyncType, ResultApplyType, ResultApplyAsyncType, ResultApplyAlwaysType, ResultApplyAlwaysAsyncType, ResultApplyIfSuccessfulType, ResultApplyIfSuccessfulAsyncType, ResultApplyIfFailureType, ResultApplyIfFailureAsyncType } from "./ResultTypes";
import { resultPromiseFromResultAsync } from "./ResultPromise";
import { ResultFactory } from "./ResultFactory";
import { OptionFactory } from "../Option";
import { ResultPromise, ResultPromiseTryMapType, ResultPromiseTryMapAsyncType } from "./ResultPromiseTypes";

export const matchAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultMatchAsyncType<TSuccess, TFailure> => 
	async (success, failure) => match(await success, await failure);

export const toString = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultToStringType => 
	() => match(success => `Success: ${success}`, failure => `Failure: ${failure}`);

export const isSuccess = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultIsSuccessType => 
	() => match(success => true, failure => false);

export const toPromise = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultToPromiseType<TSuccess, TFailure> => 
	() => match(success => ResultFactory.successAsync(async () => success), failure => ResultFactory.failureAsync(async () => failure));

export const success = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultSuccessType<TSuccess> => 
	() => match(success => OptionFactory.some(success), failure => OptionFactory.none());

export const failure = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultSuccessType<TFailure> => 
	() => match(success => OptionFactory.none(), failure => OptionFactory.some(failure));

export const map = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultMapType<TSuccess, TFailure> => 
	<TResult> (mapSuccess: (success: TSuccess) => TResult) => 
		match(success => ResultFactory.success<TResult, TFailure>(mapSuccess(success)), failure => ResultFactory.failure<TResult, TFailure>(failure));

export const mapAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultMapAsyncType<TSuccess, TFailure> => 
	<TResult> (mapSuccess: (success: TSuccess) => Promise<TResult>) => 
		match(success => ResultFactory.successAsync<TResult, TFailure>(() => mapSuccess(success)), failure => ResultFactory.failureAsync<TResult, TFailure>(async () => failure));

export const mapFailure = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultMapFailureType<TSuccess, TFailure> => 
	<TMapFailure> (mapFailure: (failure: TFailure) => TMapFailure) => 
		match(success => ResultFactory.success<TSuccess, TMapFailure>(success), failure => ResultFactory.failure<TSuccess, TMapFailure>(mapFailure(failure)));

export const mapFailureAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultMapFailureAsyncType<TSuccess, TFailure> => 
	<TMapFailure> (mapFailure: (failure: TFailure) => Promise<TMapFailure>) => 
		match(success => ResultFactory.successAsync<TSuccess, TMapFailure>(async () => success), failure => ResultFactory.failureAsync<TSuccess, TMapFailure>(() => mapFailure(failure)));

export const tryMap = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultTryMapType<TSuccess, TFailure> => {
	function tryMapOverloaded<TResult, TMapFailure extends Error & TFailure>(map: (success: TSuccess) => TResult) : Result<TResult, Error | TFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => TResult, mapFailure: (error: Error) => TMapFailure) : Result<TResult, TMapFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => TResult, mapFailure: (error: Error) => TMapFailure = undefined) {
		if(mapFailure === undefined)
		{
			return match<Result<TResult, Error | TFailure>>(success => ResultFactory.try<TResult>(() => map(success)), failure => ResultFactory.failure(failure));
		}
		else
		{
			return match(success => ResultFactory.try(() => {
					return map(success);
				})
				.mapFailure(error => mapFailure(error)),
				failure => ResultFactory.failure(failure));	
		}
	}
	return tryMapOverloaded;
}

export const tryMapAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultTryMapAsyncType<TSuccess, TFailure> => {
	function tryMapOverloaded<TResult, TMapFailure extends Error & TFailure>(map: (success: TSuccess) => Promise<TResult>) : ResultPromise<TResult, Error | TFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => Promise<TResult>, mapFailure: (error: Error) => Promise<TMapFailure>) : ResultPromise<TResult, TMapFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => Promise<TResult>, mapFailure: (error: Error) => Promise<TMapFailure> = undefined) {
		if(mapFailure === undefined)
		{
			return match<ResultPromise<TResult, Error | TFailure>>(success => ResultFactory.tryAsync<TResult>(() => map(success)), failure => ResultFactory.failureAsync(async () => failure));
		}
		else
		{
			return match<ResultPromise<TResult, TFailure>>(success => ResultFactory.tryAsync(() => {
					return map(success);
				})
				.mapFailureAsync(error => mapFailure(error)),
				failure => ResultFactory.failureAsync(async () => failure));	
		}
	}
	return tryMapOverloaded;
}

export const tryMapFromPromise = <TSuccess, TFailure>(result: Promise<Result<TSuccess, TFailure>>) : ResultPromiseTryMapType<TSuccess, TFailure> => {
	function tryMapOverloaded<TResult, TMapFailure extends Error & TFailure>(map: (success: TSuccess) => TResult) : ResultPromise<TResult, Error | TFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => TResult, mapFailure: (error: Error) => TMapFailure) : ResultPromise<TResult, TMapFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => TResult, mapFailure: (error: Error) => TMapFailure = undefined) {
		if(mapFailure === undefined)
		{
			return result.then(r => r.match<Result<TResult, Error | TFailure>>(success => ResultFactory.try<TResult>(() => map(success)), failure => ResultFactory.failure(failure)));
		}
		else
		{
			return result.then(r => r.match(success => ResultFactory.try(() => {
					return map(success);
				})
				.mapFailure(error => mapFailure(error)),
				failure => ResultFactory.failure(failure)));	
		}
	}
	return tryMapOverloaded;
}

export const tryMapAsyncFromPromise = <TSuccess, TFailure>(result: Promise<Result<TSuccess, TFailure>>) : ResultPromiseTryMapAsyncType<TSuccess, TFailure> => {
	function tryMapOverloaded<TResult, TMapFailure extends Error & TFailure>(map: (success: TSuccess) => Promise<TResult>) : ResultPromise<TResult, Error | TFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => Promise<TResult>, mapFailure: (error: Error) => Promise<TMapFailure>) : ResultPromise<TResult, TMapFailure>
	function tryMapOverloaded<TResult, TMapFailure extends TFailure>(map: (success: TSuccess) => Promise<TResult>, mapFailure: (error: Error) => Promise<TMapFailure> = undefined) {
		if(mapFailure === undefined)
		{
			return result.then(r => r.match<ResultPromise<TResult, Error | TFailure>>(success => ResultFactory.tryAsync<TResult>(() => map(success)), failure => ResultFactory.failureAsync(async () => failure)));
		}
		else
		{
			return result.then(r => r.match(success => ResultFactory.tryAsync(() => {
					return map(success);
				})
				.mapFailureAsync(error => mapFailure(error)),
				failure => ResultFactory.failureAsync(async () => failure)));	
		}
	}
	return tryMapOverloaded;
}

export const bind = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultBindType<TSuccess, TFailure> => 
	<TResult> (bind: (success: TSuccess) => Result<TResult, TFailure>) => 
		match(success => bind(success), failure => ResultFactory.failure<TResult, TFailure>(failure));

export const bindAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultBindAsyncType<TSuccess, TFailure> => 
	<TResult> (bind: (success: TSuccess) => ResultPromise<TResult, TFailure>) => 
		match(success => bind(success), failure => ResultFactory.failureAsync<TResult, TFailure>(async () => failure));

export const bindFailure = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultBindFailureType<TSuccess, TFailure> => 
	<TResult> (bind: (failure: TFailure) => Result<TSuccess, TResult>) => 
		match(success => ResultFactory.success<TSuccess, TResult>(success), failure => bind(failure));

export const bindFailureAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultBindFailureAsyncType<TSuccess, TFailure> => 
	<TResult> (bind: (failure: TFailure) => ResultPromise<TSuccess, TResult>) => 
		match(success => ResultFactory.successAsync<TSuccess, TResult>(async () => success), failure => bind(failure));

export const where = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultWhereType<TSuccess, TFailure> => 
	(predicate: (success: TSuccess) => boolean, failureFactory: (success: TSuccess) => TFailure) => 
		match(success => ResultFactory.create(predicate(success), () => success, () => failureFactory(success)), failure => ResultFactory.failure(failure));

export const whereAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultWhereAsyncType<TSuccess, TFailure> => 
	(predicate: (success: TSuccess) => Promise<boolean>, failureFactory: (success: TSuccess) => Promise<TFailure>) => 
		match(success => ResultFactory.createAsync(() => predicate(success), async () => success, () => failureFactory(success)), failure => ResultFactory.failureAsync(async () => failure));

export const resultDo = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoType<TSuccess, TFailure> => 
	(doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) => 
		match(success => {
			doIfSuccess(success);
			return ResultFactory.success(success);
		},
		failure => {
			doIfFailure(failure);
			return ResultFactory.failure(failure)
		});

export const doAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoAsyncType<TSuccess, TFailure> => 
	(doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) => 
		resultPromiseFromResultAsync(match(
		async success => {
			await doIfSuccess(success);
			return ResultFactory.success<TSuccess, TFailure>(success);
		},
		async failure => {
			await doIfFailure(failure);
			return ResultFactory.failure<TSuccess, TFailure>(failure)
		}));

export const doAlways = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoAlwaysType<TSuccess, TFailure> => 
	(doAlways: () => void) => 
		match(success => {
			doAlways();
			return ResultFactory.success(success);
		},
		failure => {
			doAlways();
			return ResultFactory.failure(failure)
		});

export const doAlwaysAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoAlwaysAsyncType<TSuccess, TFailure> => 
	(doAlways: () => void) => 
		resultPromiseFromResultAsync(match(
		async success => {
			await doAlways();
			return ResultFactory.success<TSuccess, TFailure>(success);
		},
		async failure => {
			await doAlways();
			return ResultFactory.failure<TSuccess, TFailure>(failure)
		}));

export const doIfSuccessful = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoIfSuccessfulType<TSuccess, TFailure> => 
	(doIfSuccess: (success: TSuccess) => void) => 
		match(success => {
			doIfSuccess(success);
			return ResultFactory.success(success);
		},
		failure => ResultFactory.failure(failure));

export const doIfSuccessfulAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoIfSuccessfulAsyncType<TSuccess, TFailure> => 
	(doIfSuccess: (success: TSuccess) => Promise<void>) => 
		resultPromiseFromResultAsync(match(
		async success => {
			await doIfSuccess(success);
			return ResultFactory.success<TSuccess, TFailure>(success);
		},
		async failure => ResultFactory.failure<TSuccess, TFailure>(failure)));

export const doIfFailure = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoIfFailureType<TSuccess, TFailure> => 
	(doIfFailure: (failure: TFailure) => void) => 
		match(
		success => ResultFactory.success(success),
		failure => {
			doIfFailure(failure);
			return ResultFactory.failure(failure)
		});

export const doIfFailureAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultDoIfFailureAsyncType<TSuccess, TFailure> => 
	(doIfFailure: (failure: TFailure) => Promise<void>) => 
		resultPromiseFromResultAsync(match(
		async success => ResultFactory.success<TSuccess, TFailure>(success),
		async failure => {
			await doIfFailure(failure);
			return ResultFactory.failure<TSuccess, TFailure>(failure)
		}));

export const apply = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyType<TSuccess, TFailure> => 
	(doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) => resultDo(match)(doIfSuccess, doIfFailure);

export const applyAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyAsyncType<TSuccess, TFailure> => 
	async (doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) => { await doAsync(match)(doIfSuccess, doIfFailure); }

export const applyAlways = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyAlwaysType<TSuccess, TFailure> => 
	(applyAlways: () => void) => doAlways(match)(applyAlways);

export const applyAlwaysAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyAlwaysAsyncType<TSuccess, TFailure> => 
	async (applyAlways: () => Promise<void>) => { await doAlwaysAsync(match)(applyAlways); }

export const applyIfSuccessful = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyIfSuccessfulType<TSuccess> => 
	(doIfSuccess: (success: TSuccess) => void) => doIfSuccessful(match)(doIfSuccess);

export const applyIfSuccessfulAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyIfSuccessfulAsyncType<TSuccess> => 
	async (doIfSuccess: (success: TSuccess) => Promise<void>) => { await doIfSuccessfulAsync(match)(doIfSuccess); }

export const applyIfFailure = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyIfFailureType<TFailure> => 
	(applyIfFailure: (failure: TFailure) => void) => doIfFailure(match)(applyIfFailure);

export const applyIfFailureAsync = <TSuccess, TFailure>(match: ResultMatchType<TSuccess, TFailure>) : ResultApplyIfFailureAsyncType<TFailure> => 
	async (doIfFailure: (failure: TFailure) => Promise<void>) => { await doIfFailureAsync(match)(doIfFailure); }