
import { Option, ToStringType, HasValueType, ToNullableType, ValueOrDefaultType, MapType, BindType, BindOnNoneType, WhereType, MatchType, DefaultIfNone, DoType, DoIfSomeType, DoIfNoneType, ApplyType, ApplyIfNoneType, ApplyIfSomeType } from "./Option";
import { OptionFactory, optionSome } from "./OptionFactory";

const toString = <TValue>(match: MatchType<TValue>) : ToStringType =>
	() => match(value => `Some: ${value}`, () => "None");

const hasValue = <TValue>(match: MatchType<TValue>) : HasValueType =>
	() => match(_ => true, () => false);

const valueOrDefault = <TValue>(match: MatchType<TValue>) : ValueOrDefaultType<TValue> =>
	(defaultValue: TValue) => match(value => value, () => defaultValue);

const defaultIfNone = <TValue>(match: MatchType<TValue>) : DefaultIfNone<TValue> =>
	(defaultValue: TValue) => match(value => optionSome(value), () => optionSome(defaultValue));

const toNullable = <TValue>(match: MatchType<TValue>) : ToNullableType<TValue> =>
	() => match(value => value, () => null);

const map = <TValue>(match: MatchType<TValue>) : MapType<TValue> =>
	<TResult>(map: (some: TValue) => TResult) => match(value => OptionFactory.some(map(value)), OptionFactory.none);

const bind = <TValue>(match: MatchType<TValue>) : BindType<TValue> =>
	<TResult>(bind: (some: TValue) => Option<TResult>) => match(value => bind(value), () => OptionFactory.none<TResult>());

const bindOnNone = <TValue>(match: MatchType<TValue>) : BindOnNoneType<TValue> =>
	(bind: () => Option<TValue>) => match(value => OptionFactory.some(value), bind);

const where = <TValue>(match: MatchType<TValue>) : WhereType<TValue> =>
	(predicate: (some: TValue) => boolean) =>  match(value => OptionFactory.create(predicate(value), () => value), () => OptionFactory.none<TValue>());

const optionDo = <TValue>(match: MatchType<TValue>) : DoType<TValue> =>
	(doIfSome: (some: TValue) => void, doIfNone: () => void) =>
		match(
			value =>
			{
				doIfSome(value);
				return OptionFactory.some(value)
			},
			() => 
			{
				doIfNone();
				return OptionFactory.none<TValue>()
			});

const doIfSome = <TValue>(match: MatchType<TValue>) : DoIfSomeType<TValue> =>
	(doIfSome: (some: TValue) => void) =>
		match(
			value =>
			{
				doIfSome(value);
				return OptionFactory.some(value)
			},
			() => OptionFactory.none<TValue>());

const doIfNone = <TValue>(match: MatchType<TValue>) : DoIfNoneType<TValue> =>
	(doIfNone: () => void) =>
		match(
			value => OptionFactory.some(value),
			() =>
			{
				doIfNone();
				return OptionFactory.none<TValue>()
			});

const apply = <TValue>(match: MatchType<TValue>) : DoType<TValue> =>
	(doIfSome: (some: TValue) => void, doIfNone: () => void) =>
		match(
			value =>
			{
				doIfSome(value);
				return OptionFactory.some(value)
			},
			() => 
			{
				doIfNone();
				return OptionFactory.none<TValue>()
			});

const applyIfSome = <TValue>(match: MatchType<TValue>) : DoIfSomeType<TValue> =>
	(doIfSome: (some: TValue) => void) =>
		match(
			value =>
			{
				doIfSome(value);
				return OptionFactory.some(value)
			},
			() => OptionFactory.none<TValue>());

const applyIfNone = <TValue>(match: MatchType<TValue>) : DoIfNoneType<TValue> =>
	(doIfNone: () => void) =>
		match(
			value => OptionFactory.some(value),
			() =>
			{
				doIfNone();
				return OptionFactory.none<TValue>()
			});

export const optionExtensions = <TValue>(match: MatchType<TValue>) => ({
	toString: <ToStringType> toString(match),
	hasValue: <HasValueType> hasValue(match),
	valueOrDefault: <ValueOrDefaultType<TValue>> valueOrDefault(match),
	defaultIfNone: <DefaultIfNone<TValue>> defaultIfNone(match),
	toNullable: <ToNullableType<TValue>> toNullable(match),
	match: <MatchType<TValue>> match,
	map: <MapType<TValue>> map(match),
	bind: <BindType<TValue>> bind(match),
	bindOnNone: <BindOnNoneType<TValue>> bindOnNone(match),
	where: <WhereType<TValue>> where(match),
	do: <DoType<TValue>> optionDo(match),
	doIfSome: <DoIfSomeType<TValue>> doIfSome(match),
	doIfNone: <DoIfNoneType<TValue>> doIfNone(match),
	apply: <ApplyType<TValue>> apply(match),
	applyIfSome: <ApplyIfSomeType<TValue>> applyIfSome(match),
	applyIfNone: <ApplyIfNoneType<TValue>> applyIfNone(match)
});