import { Unit } from "../Unit";
import { optionPromiseFromOptionAsync } from "./OptionPromise";
import { optionFromMatch } from "./Option";
import { Option } from "./OptionTypes";
import { OptionPromise } from "./OptionPromiseTypes";

export const optionSome = <TValue>(value: TValue) : Option<TValue> => optionFromMatch<TValue>((some, none) => some(value));
export const optionSomeAsync = <TValue>(value: () => Promise<TValue>) : OptionPromise<TValue> => optionPromiseFromOptionAsync<TValue>(value().then(v => optionSome(v)));
export const optionNone = <TValue>() : Option<TValue> => optionFromMatch<TValue>((some, none) => none());
export const optionNoneAsync = <TValue>() : OptionPromise<TValue> => optionPromiseFromOptionAsync<TValue>(Promise.resolve(optionNone()));
export const optionCreate = <TValue>(isSome: () =>  boolean, valueFactory: () => TValue) : Option<TValue> => optionFromMatch((some, none) => isSome() ? some(valueFactory()) : none());
export const optionCreateAsync = <TValue>(isSome: () => Promise<boolean>, valueFactory: () => Promise<TValue>) : OptionPromise<TValue> => optionPromiseFromOptionAsync(isSome().then(some => some ? optionSomeAsync(() => valueFactory()) : optionNoneAsync()));
export const optionFromNullable = <TValue>(value: TValue | null | undefined) : Option<TValue> => optionFromMatch((some, none) => value == null || value == undefined ? none() : some(value));
export const optionWhere = (isSuccess: () => boolean) : Option<Unit> => optionCreate(isSuccess, () => Unit);
export const optionUnit = () : Option<Unit> => optionSome(Unit);

export const OptionFactory = {
	/**
	 * Returns an Option that has the provided value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param value The value of the option.
	 * @returns An Option with a value.
	 */
	some: optionSome,

	/**
	 * Returns an Option that has the provided value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param value The value of the option.
	 * @returns An Option with a value.
	 */
	someAsync: optionSomeAsync,

	/**
	 * Returns an Option that has no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @returns An Option with no value.
	 */
	none: optionNone,

	/**
	 * Returns an Option that has no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @returns An Option with no value.
	 */
	noneAsync: optionNoneAsync,

	/**
	 * If the function passed as the first paramter resolves to true, returns an option with the value produced by the function passed in as the second parameter. Otherwise, returns an Option with no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param isSome A function that returns a boolean determining whether the Option has a value or is empty.
	 * @param valueFactory A function that produces the value of the option.
	 * @returns An Option with a value or no value depending on the result of the first paramter.
	 */
	create: optionCreate,


	/**
	 * If the function passed as the first paramter resolves to true, returns an option with the value produced by the function passed in as the second parameter. Otherwise, returns an Option with no value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param isSome A function that returns a boolean determining whether the Option has a value or is empty.
	 * @param valueFactory A function that produces the value of the option.
	 * @returns An Option with a value or no value depending on the result of the first paramter.
	 */
	createAsync: optionCreateAsync,


	/**
	 * If the value of the first paramter is null or defined, returns an Option with no value. Otherwise, returns an Option with the value.
	 * @typeparam TValue The type of the option's possible value.
	 * @param value The value of the Option or `null`\`undefined` if the Option is empty.
	 * @returns An Option with a value or no value depending on if the provided value is null or undefined.
	 */
	fromNullable: optionFromNullable,

	/**
	 * If the value of the function provided as the first parameter resolves to true, returns an `Option<Unit>` with some value. Otherwise, returns an Option with no value.
	 * @param isSuccess A function that returns a boolean determining whether the Option has a value or is empty.
	 * @returns An `Option<Unit>` that has some value or no value.
	 */
	where: optionWhere,

	/**
	 * Returns an `Option<Unit>` with a value.
	 * @returns An `Option<Unit>` with a value.
	 */
	unit: optionUnit
};