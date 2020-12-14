import { OptionPromise, Option } from "..";

declare global {
	export interface Promise<T> {
		toOptionPromise<TValue>(this: Promise<Option<TValue>>): OptionPromise<TValue>
	}
}

Promise.prototype.toOptionPromise = function <TValue>(this: Promise<Option<TValue>>) : OptionPromise<TValue> {
	return new OptionPromise(this);
}

export {};