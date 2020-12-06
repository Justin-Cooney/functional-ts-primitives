import { Unit } from "../Unit";
import { optionPromiseFromOptionAsync } from "./OptionPromise";
import { optionFromMatch } from "./Option";
import { Option } from "./OptionTypes";
import { OptionPromise } from "./OptionPromiseTypes";

import {some, none} from "./HKTOption/Option"

export const optionSome = <TValue>(value: TValue) : Option<TValue> => optionFromMatch<TValue>((onSome, onNone) => {
	const someValue = some(value);
	return someValue.match(onSome, onNone)
});
export const optionSomeAsync = <TValue>(value: () => Promise<TValue>) : OptionPromise<TValue> => optionPromiseFromOptionAsync<TValue>(value().then(v => optionSome(v)));
export const optionNone = <TValue>() : Option<TValue> => optionFromMatch<TValue>((onSome, onNone) => {
	const noneValue = none;
	return noneValue.match(onSome, onNone)
});
export const optionNoneAsync = <TValue>() : OptionPromise<TValue> => optionPromiseFromOptionAsync<TValue>(Promise.resolve(optionNone()));
export const optionCreate = <TValue>(isSome: boolean, valueFactory: () => TValue) : Option<TValue> => optionFromMatch((some, none) => isSome ? some(valueFactory()) : none());
export const optionCreateAsync = <TValue>(isSome: () => Promise<boolean>, valueFactory: () => Promise<TValue>) : OptionPromise<TValue> => optionPromiseFromOptionAsync(isSome().then(some => some ? optionSomeAsync(() => valueFactory()) : optionNoneAsync()));
export const optionFromNullable = <TValue>(value: TValue | null | undefined) : Option<TValue> => value == null || value == undefined ? optionNone<TValue>() : optionSome(value);
export const optionWhere = (isSuccess: boolean) : Option<Unit> => optionCreate(isSuccess, () => Unit);
export const optionUnit = () : Option<Unit> => optionSome(Unit);

export const OptionFactory = {
	some: optionSome,
	someAsync: optionSomeAsync,
	none: optionNone,
	noneAsync: optionNoneAsync,
	create: optionCreate,
	createAsync: optionCreateAsync,
	fromNullable: optionFromNullable,
	where: optionWhere,
	unit: optionUnit
};