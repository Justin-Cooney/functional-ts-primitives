import { Option } from "./Option";
import { optionExtensions } from "./OptionExtensions";
import { Unit } from "../Unit";

export const optionSome = <TValue>(value: TValue) : Option<TValue> => optionExtensions<TValue>((some, none) => some(value));
//export const optionSomeAsync = <TValue>(value: () => Promise<TValue>) => optionExtensions<TValue>((some, none) => some(value));
export const optionNone = <TValue>() : Option<TValue> => optionExtensions<TValue>((some, none) => none());
export const optionCreate = <TValue>(isSome: boolean, valueFactory: () => TValue) : Option<TValue> => optionExtensions((some, none) => isSome ? some(valueFactory()) : none());
export const optionFromNullable = <TValue>(value: TValue | null | undefined) : Option<TValue> => optionExtensions((some, none) => value == null || value == undefined ? none() : some(value));
export const optionWhere = <TValue>(isSuccess: boolean) : Option<Unit> => optionCreate(isSuccess, () => Unit);
export const optionUnit = () : Option<Unit> => optionSome(Unit);

export const OptionFactory = {
	some: optionSome,
	//someAsync: optionSomeAsync,
	none: optionNone,
	create: optionCreate,
	fromNullable: optionFromNullable,
	where: optionWhere
};