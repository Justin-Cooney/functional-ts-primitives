import { OptionFactory } from "./OptionFactory";
import { OptionPromise } from "./OptionPromiseTypes";
import { Option, OptionMatchType, OptionMatchAsyncType, OptionToStringType, OptionHasValueType, OptionValueOrDefaultType, OptionDefaultIfNone, OptionToNullableType, OptionToPromiseType, OptionMapType, OptionMapAsyncType, OptionBindType, OptionWhereType, OptionDoType, OptionBindAsyncType, OptionDoIfSomeType, OptionDoIfNoneType, OptionValueOrDefaultAsyncType, OptionDefaultIfNoneAsync, OptionWhereAsyncType, OptionDoAsyncType, OptionDoIfSomeAsyncType, OptionDoIfNoneAsyncType, OptionApplyType, OptionApplyAsyncType, OptionApplyIfSomeAsyncType, OptionApplyIfSomeType, OptionApplyIfNoneType, OptionApplyIfNoneAsyncType, OptionDoAlwaysType, OptionDoAlwaysAsyncType, OptionApplyAlwaysType, OptionApplyAlwaysAsyncType, OptionToResultType, OptionToResultAsyncType, OptionBindOnNoneType, OptionBindOnNoneAsyncType } from "./OptionTypes";
import { optionPromiseFromOptionAsync } from "./OptionPromise";
import { ResultFactory } from "../Result";

export const matchAsync = <TValue>(match: OptionMatchType<TValue>) : OptionMatchAsyncType<TValue> =>
	async (some, none) => match(await some, await none);

export const toString = <TValue>(match: OptionMatchType<TValue>) : OptionToStringType =>
	() => match(value => `Some: ${value}`, () => "None");

export const hasValue = <TValue>(match: OptionMatchType<TValue>) : OptionHasValueType =>
	() => match(_ => true, () => false);

export const valueOrDefault = <TValue>(match: OptionMatchType<TValue>) : OptionValueOrDefaultType<TValue> =>
	(defaultValue) => match(value => value, () => defaultValue());

export const valueOrDefaultAsync = <TValue>(match: OptionMatchType<TValue>) : OptionValueOrDefaultAsyncType<TValue> =>
	(defaultValue) => match(value => Promise.resolve(value), () => defaultValue());

export const defaultIfNone = <TValue>(match: OptionMatchType<TValue>) : OptionDefaultIfNone<TValue> =>
	(defaultValue) => match(value => OptionFactory.some(value), () => OptionFactory.some<TValue>(defaultValue()));

export const defaultIfNoneAsync = <TValue>(match: OptionMatchType<TValue>) : OptionDefaultIfNoneAsync<TValue> =>
	(defaultValue) => match(value => OptionFactory.someAsync(async () => value), () => OptionFactory.someAsync(() => defaultValue()));

export const toNullable = <TValue>(match: OptionMatchType<TValue>) : OptionToNullableType<TValue> =>
	() => match(value => value, () => null);

export const toPromise = <TValue>(match: OptionMatchType<TValue>) : OptionToPromiseType<TValue> =>
	() => match(value => OptionFactory.someAsync(() => Promise.resolve(value)), () => OptionFactory.noneAsync());

export const toResult = <TValue>(match: OptionMatchType<TValue>) : OptionToResultType<TValue> =>
	<TFailure> (failureFactory: () => TFailure) => match(value => ResultFactory.success(value), () => ResultFactory.failure(failureFactory()));

export const toResultAsync = <TValue>(match: OptionMatchType<TValue>) : OptionToResultAsyncType<TValue> =>
	<TFailure> (failureFactory: () => Promise<TFailure>) => match(value => ResultFactory.successAsync(async () => value), () => ResultFactory.failureAsync(failureFactory));

export const map = <TValue>(match: OptionMatchType<TValue>) : OptionMapType<TValue> =>
	<TResult>(map: (some: TValue) => TResult) => match(value => OptionFactory.some<TResult>(map(value)), () => OptionFactory.none<TResult>());

export const mapAsync = <TValue>(match: OptionMatchType<TValue>) : OptionMapAsyncType<TValue> =>
	<TResult>(map: (some: TValue) => Promise<TResult>) => match(value => OptionFactory.someAsync<TResult>(() => map(value)), () => OptionFactory.noneAsync<TResult>());

export const bind = <TValue>(match: OptionMatchType<TValue>) : OptionBindType<TValue> =>
	<TResult>(ifSome: (some: TValue) => Option<TResult>) => match(value => ifSome(value), () => OptionFactory.none<TResult>());

export const bindAsync = <TValue>(match: OptionMatchType<TValue>) : OptionBindAsyncType<TValue> =>
	<TResult>(ifSome: (some: TValue) => OptionPromise<TResult>) => match(value => ifSome(value), () => OptionFactory.noneAsync<TResult>());

export const bindOnNone = <TValue>(match: OptionMatchType<TValue>) : OptionBindOnNoneType<TValue> =>
	(ifNone: () => Option<TValue>) => match(value => OptionFactory.some(value), ifNone);

export const bindOnNoneAsync = <TValue>(match: OptionMatchType<TValue>) : OptionBindOnNoneAsyncType<TValue> =>
	(ifNone: () => OptionPromise<TValue>) => match(value => OptionFactory.someAsync(async () => value), ifNone);

export const where = <TValue>(match: OptionMatchType<TValue>) : OptionWhereType<TValue> =>
	(predicate: (some: TValue) => boolean) =>  match(value => OptionFactory.create(predicate(value), () => value), () => OptionFactory.none<TValue>());

export const whereAsync = <TValue>(match: OptionMatchType<TValue>) : OptionWhereAsyncType<TValue> =>
	(predicate: (some: TValue) => Promise<boolean>) =>  match(value => OptionFactory.createAsync(() => predicate(value), async () => value), () => OptionFactory.noneAsync<TValue>());

export const optionDo = <TValue>(match: OptionMatchType<TValue>) : OptionDoType<TValue> =>
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

export const doAsync = <TValue>(match: OptionMatchType<TValue>) : OptionDoAsyncType<TValue> =>
	(doIfSome: (some: TValue) => Promise<void>, doIfNone: () => Promise<void>) =>
		optionPromiseFromOptionAsync(match(
			value =>
			{
				return OptionFactory.someAsync(async () => {
					await doIfSome(value);
					return value;
				});
			},
			async () => 
			{
				await doIfNone();
				return OptionFactory.noneAsync<TValue>();
			}));

export const doAlways = <TValue>(match: OptionMatchType<TValue>) : OptionDoAlwaysType<TValue> =>
	(doAction: () => void) =>
		match(
			value =>
			{
				doAction();
				return OptionFactory.some(value)
			},
			() => 
			{
				doAction();
				return OptionFactory.none<TValue>()
			});

export const doAlwaysAsync = <TValue>(match: OptionMatchType<TValue>) : OptionDoAlwaysAsyncType<TValue> =>
	(doAction: () => void) =>
		optionPromiseFromOptionAsync(match(
			async value =>
			{
				await doAction();
				return OptionFactory.some(value)
			},
			async () => 
			{
				await doAction();
				return OptionFactory.none<TValue>()
			}));

export const doIfSome = <TValue>(match: OptionMatchType<TValue>) : OptionDoIfSomeType<TValue> =>
	(doIfSome: (some: TValue) => void) =>
		match(
			value =>
			{
				doIfSome(value);
				return OptionFactory.some(value)
			},
			() => OptionFactory.none<TValue>());

export const doIfSomeAsync = <TValue>(match: OptionMatchType<TValue>) : OptionDoIfSomeAsyncType<TValue> =>
	(doIfSome: (some: TValue) => Promise<void>) =>
		optionPromiseFromOptionAsync(match(
			async value =>
			{
				await doIfSome(value);
				return OptionFactory.some(value)
			},
			() => OptionFactory.noneAsync<TValue>()));

export const doIfNone = <TValue>(match: OptionMatchType<TValue>) : OptionDoIfNoneType<TValue> =>
	(doIfNone: () => void) =>
		match(
			value => OptionFactory.some(value),
			() =>
			{
				doIfNone();
				return OptionFactory.none<TValue>()
			});

export const doIfNoneAsync = <TValue>(match: OptionMatchType<TValue>) : OptionDoIfNoneAsyncType<TValue> =>
	(doIfNone: () => Promise<void>) =>
		optionPromiseFromOptionAsync(match(
			value => OptionFactory.someAsync(async () => value),
			async () =>
			{
				await doIfNone();
				return OptionFactory.noneAsync<TValue>()
			}));

export const apply = <TValue>(match: OptionMatchType<TValue>) : OptionApplyType<TValue> =>
	(doIfSome: (some: TValue) => void, doIfNone: () => void) =>
		match(
			value => { doIfSome(value); },
			() => { doIfNone(); });

export const applyAlways = <TValue>(match: OptionMatchType<TValue>) : OptionApplyAlwaysType =>
	(doAlways: () => void) =>
		match(
			value => { doAlways(); },
			() => { doAlways(); });

export const applyAlwaysAsync = <TValue>(match: OptionMatchType<TValue>) : OptionApplyAlwaysAsyncType =>
	(doAlways: () => void) =>
		match(
			async value => { await doAlways();},
			async () => { await doAlways(); });

export const applyAsync = <TValue>(match: OptionMatchType<TValue>) : OptionApplyAsyncType<TValue> =>
	(doIfSome: (some: TValue) => Promise<void>, doIfNone: () => Promise<void>) =>
		match(
			async value => { await doIfSome(value); },
			async () => { await doIfNone(); });

export const applyIfSome = <TValue>(match: OptionMatchType<TValue>) : OptionApplyIfSomeType<TValue> =>
	(doIfSome: (some: TValue) => void) =>
		match(
			value => { doIfSome(value); },
			() => {});

export const applyIfSomeAsync = <TValue>(match: OptionMatchType<TValue>) : OptionApplyIfSomeAsyncType<TValue> =>
	(doIfSome: (some: TValue) => Promise<void>) =>
		match(
			async value => { await doIfSome(value); },
			async () => {});

export const applyIfNone = <TValue>(match: OptionMatchType<TValue>) : OptionApplyIfNoneType =>
	(doIfNone: () => void) =>
		match(
			value => {},
			() => { doIfNone(); });

export const applyIfNoneAsync = <TValue>(match: OptionMatchType<TValue>) : OptionApplyIfNoneAsyncType =>
	(doIfNone: () => void) =>
		match(
			async value => {},
			async () => { await doIfNone(); });