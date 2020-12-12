import { ResultPromise } from "./ResultPromise";
import { Result } from "..";

declare global {
	export interface Promise<T> {
		toResultPromise<TSuccess, TFailure>(this: Promise<Result<TSuccess, TFailure>>): ResultPromise<TSuccess, TFailure>
	}
}

Promise.prototype.toResultPromise = function <TSuccess, TFailure>(this: Promise<Result<TSuccess, TFailure>>) : ResultPromise<TSuccess, TFailure> {
	return new ResultPromise(this);
}
export {};