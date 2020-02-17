import { Unit } from "../Unit";
import { optionPromiseFromOptionAsync } from "./OptionPromise";
import { optionFromMatch } from "./Option";
import { Option } from "./OptionTypes";
import { OptionPromise } from "./OptionPromiseTypes";

export const optionSome = <TValue>(value: TValue) : Option<TValue> => optionFromMatch<TValue>((some, none) => some(value));
export const optionSomeAsync = <TValue>(value: () => Promise<TValue>) : OptionPromise<TValue> => optionPromiseFromOptionAsync<TValue>(value().then(v => optionSome(v)));
export const optionNone = <TValue>() : Option<TValue> => optionFromMatch<TValue>((some, none) => none());
export const optionNoneAsync = <TValue>() : OptionPromise<TValue> => optionPromiseFromOptionAsync<TValue>(Promise.resolve(optionNone()));
export const optionCreate = <TValue>(isSome: boolean, valueFactory: () => TValue) : Option<TValue> => optionFromMatch((some, none) => isSome ? some(valueFactory()) : none());
export const optionCreateAsync = <TValue>(isSome: () => Promise<boolean>, valueFactory: () => Promise<TValue>) : OptionPromise<TValue> => optionPromiseFromOptionAsync(isSome().then(some => some ? optionSomeAsync(() => valueFactory()) : optionNoneAsync()));
export const optionFromNullable = <TValue>(value: TValue | null | undefined) : Option<TValue> => optionFromMatch((some, none) => value == null || value == undefined ? none() : some(value));
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