import { Result } from "./ResultTypes";
import { OptionPromise } from "../Option";

export type ResultPromiseMatchType<TSuccess, TFailure> = <T>(success: (some: TSuccess) => T, failure: (failure: TFailure) => T) => Promise<T>;
export type ResultPromiseMatchAsyncType<TSuccess, TFailure> = <T>(success: (some: TSuccess) => Promise<T>, failure: (failure: TFailure) => Promise<T>) => Promise<T>;
export type ResultPromiseToStringAsyncType = () => Promise<string>;
export type ResultPromiseIsSuccessType = () => Promise<boolean>;
export type ResultPromiseSuccessType<TSuccess> = () => OptionPromise<TSuccess>
export type ResultPromiseFailureType<TFailure> = () => OptionPromise<TFailure>
export type ResultPromiseMapType<TSuccess, TFailure> = <TResult>(mapSuccess: (success: TSuccess) => TResult) => ResultPromise<TResult, TFailure>
export type ResultPromiseMapAsyncType<TSuccess, TFailure> = <TResult>(mapSuccess: (success: TSuccess) => Promise<TResult>) => ResultPromise<TResult, TFailure>
export type ResultPromiseMapFailureType<TSuccess, TFailure> = <TMapFailure>(mapFailure: (failure: TFailure) => TMapFailure) => ResultPromise<TSuccess, TMapFailure>
export type ResultPromiseMapFailureAsyncType<TSuccess, TFailure> = <TMapFailure>(mapFailure: (failure: TFailure) => Promise<TMapFailure>) => ResultPromise<TSuccess, TMapFailure>
export type ResultPromiseTryMapType<TSuccess, TFailure> = {
	<TResult, TMapFailure extends TFailure = TFailure>(map: (success: TSuccess) => TResult, mapFailure: (error: Error) => TFailure) : ResultPromise<TResult, TFailure>;
	<TResult, TError extends TFailure & Error>(map: (success: TSuccess) => TResult) : ResultPromise<TResult, TFailure | Error>;
}
export type ResultPromiseTryMapAsyncType<TSuccess, TFailure> = {
	<TResult, TMapFailure extends TFailure = TFailure>(mapAsync: (success: TSuccess) => Promise<TResult>, mapFailure: (error: Error) => Promise<TFailure>) : ResultPromise<TResult, TMapFailure>;
	<TResult, TError extends TFailure & Error>(mapAsync: (success: TSuccess) => Promise<TResult>) : ResultPromise<TResult, TFailure | Error>;
}
export type ResultPromiseBindType<TSuccess, TFailure> = <TResult>(bind: (success: TSuccess) => Result<TResult, TFailure>) => ResultPromise<TResult, TFailure>
export type ResultPromiseBindAsyncType<TSuccess, TFailure> = <TResult>(bind: (success: TSuccess) => Promise<Result<TResult, TFailure>>) => ResultPromise<TResult, TFailure>
export type ResultPromiseBindFailureType<TSuccess, TFailure> = <TResult>(bindFailure: (failure: TFailure) => Result<TSuccess, TResult>) => ResultPromise<TSuccess, TResult>
export type ResultPromiseBindFailureAsyncType<TSuccess, TFailure> = <TResult>(bindFailure: (failure: TFailure) => Promise<Result<TSuccess, TResult>>) => ResultPromise<TSuccess, TResult>
export type ResultPromiseWhereType<TSuccess, TFailure> = (predicate: (success: TSuccess) => boolean, failureFactory: (success: TSuccess) => TFailure) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseWhereAsyncType<TSuccess, TFailure> = (predicate: (success: TSuccess) => Promise<boolean>, failureFactory: (success: TSuccess) => Promise<TFailure>) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoAsyncType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoAlwaysType<TSuccess, TFailure> = (doAction: () => void) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoAlwaysAsyncType<TSuccess, TFailure> = (doAction: () => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoIfSuccessfulType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => void) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoIfSuccessfulAsyncType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoIfFailureType<TSuccess, TFailure> = (doIfFailure: (failure: TFailure) => void) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseDoIfFailureAsyncType<TSuccess, TFailure> = (doIfFailure: (failure: TFailure) => Promise<void>) => ResultPromise<TSuccess, TFailure>
export type ResultPromiseApplyType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => void, doIfFailure: (failure: TFailure) => void) => void
export type ResultPromiseApplyAsyncType<TSuccess, TFailure> = (doIfSuccess: (success: TSuccess) => Promise<void>, doIfFailure: (failure: TFailure) => Promise<void>) => Promise<void>
export type ResultPromiseApplyAlwaysType<TSuccess, TFailure> = (doAction: () => void) => void
export type ResultPromiseApplyAlwaysAsyncType<TSuccess, TFailure> = (doAction: () => Promise<void>) => Promise<void>
export type ResultPromiseApplyIfSuccessfulType<TSuccess> = (doIfSuccess: (success: TSuccess) => void) => void
export type ResultPromiseApplyIfSuccessfulAsyncType<TSuccess> = (doIfSuccess: (success: TSuccess) => Promise<void>) => Promise<void>
export type ResultPromiseApplyIfFailureType<TFailure> = (doIfFailure: (failure: TFailure) => void) => void
export type ResultPromiseApplyIfFailureAsyncType<TFailure> = (doIfFailure: (failure: TFailure) => Promise<void>) => Promise<void>

export type ResultPromise<TSuccess, TFailure> = Promise<Result<TSuccess, TFailure>> & {
	match: ResultPromiseMatchType<TSuccess, TFailure>,
	matchAsync: ResultPromiseMatchAsyncType<TSuccess, TFailure>,
	toStringAsync: ResultPromiseToStringAsyncType,
	isSuccess: ResultPromiseIsSuccessType,
	success: ResultPromiseSuccessType<TSuccess>,
	failure: ResultPromiseFailureType<TFailure>,
	map: ResultPromiseMapType<TSuccess, TFailure>,
	mapAsync: ResultPromiseMapAsyncType<TSuccess, TFailure>,
	mapFailure: ResultPromiseMapFailureType<TSuccess, TFailure>,
	mapFailureAsync: ResultPromiseMapFailureAsyncType<TSuccess, TFailure>,
	tryMap: ResultPromiseTryMapType<TSuccess, TFailure>,
	tryMapAsync: ResultPromiseTryMapAsyncType<TSuccess, TFailure>,
	bind: ResultPromiseBindType<TSuccess, TFailure>,
	bindAsync: ResultPromiseBindAsyncType<TSuccess, TFailure>,
	bindFailure: ResultPromiseBindFailureType<TSuccess, TFailure>,
	bindFailureAsync: ResultPromiseBindFailureAsyncType<TSuccess, TFailure>,
	where: ResultPromiseWhereType<TSuccess, TFailure>,
	whereAsync: ResultPromiseWhereAsyncType<TSuccess, TFailure>,
	do: ResultPromiseDoType<TSuccess, TFailure>,
	doAsync: ResultPromiseDoAsyncType<TSuccess, TFailure>,
	doAlways: ResultPromiseDoAlwaysType<TSuccess, TFailure>,
	doAlwaysAsync: ResultPromiseDoAlwaysAsyncType<TSuccess, TFailure>,
	doIfSuccessful: ResultPromiseDoIfSuccessfulType<TSuccess, TFailure>,
	doIfSuccessfulAsync: ResultPromiseDoIfSuccessfulAsyncType<TSuccess, TFailure>,
	doIfFailure: ResultPromiseDoIfFailureType<TSuccess, TFailure>,
	doIfFailureAsync: ResultPromiseDoIfFailureAsyncType<TSuccess, TFailure>,
	apply: ResultPromiseApplyType<TSuccess, TFailure>,
	applyAsync: ResultPromiseApplyAsyncType<TSuccess, TFailure>,
	applyAlways: ResultPromiseApplyAlwaysType<TSuccess, TFailure>,
	applyAlwaysAsync: ResultPromiseApplyAlwaysAsyncType<TSuccess, TFailure>,
	applyIfSuccessful: ResultPromiseApplyIfSuccessfulType<TSuccess>,
	applyIfSuccessfulAsync: ResultPromiseApplyIfSuccessfulAsyncType<TSuccess>,
	applyIfFailure: ResultPromiseApplyIfFailureType<TFailure>,
	applyIfFailureAsync: ResultPromiseApplyIfFailureAsyncType<TFailure>,
}