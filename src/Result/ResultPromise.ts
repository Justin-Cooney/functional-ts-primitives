import { ResultPromise } from "./ResultPromiseTypes";
import { Result } from "./ResultTypes";
import { optionPromiseFromOptionAsync } from "../Option/OptionPromise";
import { tryMapFromPromise, tryMapAsyncFromPromise } from "./ResultExtensions";



export const resultPromiseFromResultAsync = <TSuccess, TFailure>(promise: Promise<Result<TSuccess, TFailure>>) : ResultPromise<TSuccess, TFailure> => ({
	[Symbol.toStringTag]: promise.toString(),
	then: (onfulfilled, onrejected) => promise.then(onfulfilled, onrejected),
	catch: (onrejected) => promise.catch(onrejected),
	finally: (onfinally) => promise.finally(onfinally),

	match: (some, none) => promise.then(result => result.match(some, none)),
	matchAsync: (some, none) => promise.then(result => result.matchAsync(some, none)),
	toStringAsync: () => promise.then(result => result.toString()),
	isSuccess: () => promise.then(result => result.isSuccess()),
	success: () => optionPromiseFromOptionAsync(promise.then(result => result.success())),
	failure: () => optionPromiseFromOptionAsync(promise.then(result => result.failure())),
	map: (map) => resultPromiseFromResultAsync(promise.then(result => result.map(map))),
	mapAsync: (map) => resultPromiseFromResultAsync(promise.then(result => result.mapAsync(map))),
	mapFailure: (mapFailure) => resultPromiseFromResultAsync(promise.then(result => result.mapFailure(mapFailure))),
	mapFailureAsync: (mapFailure) => resultPromiseFromResultAsync(promise.then(result => result.mapFailureAsync(mapFailure))),
	tryMap: tryMapFromPromise(promise),
	tryMapAsync: tryMapAsyncFromPromise(promise),
	bind: (bind) => resultPromiseFromResultAsync(promise.then(result => result.bind(bind))),
	bindAsync: (bind) => resultPromiseFromResultAsync(promise.then(result => result.bindAsync(bind))),
	bindFailure: (bind) => resultPromiseFromResultAsync(promise.then(result => result.bindFailure(bind))),
	bindFailureAsync: (bind) => resultPromiseFromResultAsync(promise.then(result => result.bindFailureAsync(bind))),
	where: (predicate, failureFactory) => resultPromiseFromResultAsync(promise.then(result => result.where(predicate, failureFactory))),
	whereAsync: (predicate, failureFactory) => resultPromiseFromResultAsync(promise.then(result => result.whereAsync(predicate, failureFactory))),
	do: (doIfSuccess, doIfFailure) => resultPromiseFromResultAsync(promise.then(result => result.do(doIfSuccess, doIfFailure))),
	doAsync: (doIfSuccess, doIfFailure) => resultPromiseFromResultAsync(promise.then(result => result.doAsync(doIfSuccess, doIfFailure))),
	doAlways: (doAlways) => resultPromiseFromResultAsync(promise.then(result => result.doAlways(doAlways))),
	doAlwaysAsync: (doAlways) => resultPromiseFromResultAsync(promise.then(result => result.doAlwaysAsync(doAlways))),
	doIfSuccessful: (doIfSuccess) => resultPromiseFromResultAsync(promise.then(result => result.doIfSuccessful(doIfSuccess))),
	doIfSuccessfulAsync: (doIfSuccess) => resultPromiseFromResultAsync(promise.then(result => result.doIfSuccessfulAsync(doIfSuccess))),
	doIfFailure: (doIfFailure) => resultPromiseFromResultAsync(promise.then(result => result.doIfFailure(doIfFailure))),
	doIfFailureAsync: (doIfFailure) => resultPromiseFromResultAsync(promise.then(result => result.doIfFailureAsync(doIfFailure))),
	apply: (ifSucess, ifFailure) => promise.then(result => result.apply(ifSucess, ifFailure)),
	applyAsync: (ifSucess, ifFailure) => promise.then(result => result.applyAsync(ifSucess, ifFailure)),
	applyAlways: (apply) => promise.then(result => result.applyAlways(apply)),
	applyAlwaysAsync: (apply) => promise.then(result => result.applyAlwaysAsync(apply)),
	applyIfFailure: (ifFailure) => promise.then(result => result.applyIfFailure(ifFailure)),
	applyIfFailureAsync: (ifFailure) => promise.then(result => result.applyIfFailureAsync(ifFailure)),
	applyIfSuccessful: (ifSucess) => promise.then(result => result.applyIfSuccessful(ifSucess)),
	applyIfSuccessfulAsync: (ifSucess) => promise.then(result => result.applyIfSuccessfulAsync(ifSucess)),
});