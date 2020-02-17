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


export type Result<TSuccess, TFailure> = {
	match: ResultMatchType<TSuccess, TFailure>,
	matchAsync: ResultMatchAsyncType<TSuccess, TFailure>,
	toString: ResultToStringType,
	isSuccess: ResultIsSuccessType,
	toPromise: ResultToPromiseType<TSuccess, TFailure>,
	success: ResultSuccessType<TSuccess>,
	failure: ResultFailureType<TFailure>,
	map: ResultMapType<TSuccess, TFailure>,
	mapAsync: ResultMapAsyncType<TSuccess, TFailure>,
	mapFailure: ResultMapFailureType<TSuccess, TFailure>,
	mapFailureAsync: ResultMapFailureAsyncType<TSuccess, TFailure>,
	tryMap: ResultTryMapType<TSuccess, TFailure>,
	tryMapAsync: ResultTryMapAsyncType<TSuccess, TFailure>,
	bind: ResultBindType<TSuccess, TFailure>,
	bindAsync: ResultBindAsyncType<TSuccess, TFailure>,
	bindFailure: ResultBindFailureType<TSuccess, TFailure>,
	bindFailureAsync: ResultBindFailureAsyncType<TSuccess, TFailure>,
	where: ResultWhereType<TSuccess, TFailure>,
	whereAsync: ResultWhereAsyncType<TSuccess, TFailure>
	do: ResultDoType<TSuccess, TFailure>,
	doAsync: ResultDoAsyncType<TSuccess, TFailure>,
	doAlways: ResultDoAlwaysType<TSuccess, TFailure>,
	doAlwaysAsync: ResultDoAlwaysAsyncType<TSuccess, TFailure>,
	doIfSuccessful: ResultDoIfSuccessfulType<TSuccess, TFailure>,
	doIfSuccessfulAsync: ResultDoIfSuccessfulAsyncType<TSuccess, TFailure>,
	doIfFailure: ResultDoIfFailureType<TSuccess, TFailure>,
	doIfFailureAsync: ResultDoIfFailureAsyncType<TSuccess, TFailure>,
	apply: ResultApplyType<TSuccess, TFailure>,
	applyAsync: ResultApplyAsyncType<TSuccess, TFailure>,
	applyAlways: ResultApplyAlwaysType<TSuccess, TFailure>,
	applyAlwaysAsync: ResultApplyAlwaysAsyncType<TSuccess, TFailure>,
	applyIfSuccessful: ResultApplyIfSuccessfulType<TSuccess>,
	applyIfSuccessfulAsync: ResultApplyIfSuccessfulAsyncType<TSuccess>,
	applyIfFailure: ResultApplyIfFailureType<TFailure>,
	applyIfFailureAsync: ResultApplyIfFailureAsyncType<TFailure>,
}