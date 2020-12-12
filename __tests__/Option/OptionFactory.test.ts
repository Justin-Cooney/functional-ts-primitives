import { Unit, Option } from "../../src";

describe('Factory Methods', () => {
	test('some returns option with value', () => {
		const option = Option.some(100);
		expect(option.hasValue()).toBeTruthy();
		expect(option.match(x => 100, () => 34)).toBe(100);
	});
	test('someAsync returns option with value', async () => {
		const option = await Option.someAsync(async () => 100);
		expect(option.hasValue()).toBeTruthy();
		expect(option.match(x => 100, () => 34)).toBe(100);
	});
	test('none returns empty option', () => {
		const option = Option.none<number>();
		expect(option.hasValue()).toBeFalsy();
		expect(option.match(x => 100, () => 34)).toBe(34);
	});
	test('noneAsync returns empty option', async () => {
		const option = await Option.noneAsync<number>();
		expect(option.hasValue()).toBeFalsy();
		expect(option.match(x => 100, () => 34)).toBe(34);
	});
	test('create returns empty when false', async () => {
		const option = Option.create<number>(() => false, () => 50);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('create returns value when true', async () => {
		const option = Option.create<number>(() => true, () => 50);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(50);
	});
	test('createAsync returns empty when false', async () => {
		const option = await Option.createAsync<number>(async () => false, async () => 50);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('createAsync returns value when true', async () => {
		const option = await Option.createAsync<number>(async () => true, async () => 50);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(50);
	});
	test('fromNullable returns empty when using null', async () => {
		const option = Option.fromNullable<number>(null);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('fromNullable returns empty when using undefined', async () => {
		const option = Option.fromNullable<number>(undefined);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('fromNullable returns value when using value', async () => {
		const option = Option.fromNullable<number>(50);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(50);
	});
	test('where returns unit when true', () => {
		const option = Option.where(() => true);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(Unit);
	});
	test('where returns empty when false', () => {
		const option = Option.where(() => false);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('unit returns unit', () => {
		const option = Option.unit();
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(Unit);
	});
});

describe('Option Zip', () => {
	test('zip returns some when all have some', () => {
		const tuple2 = Option.zip(Option.some(1), Option.some(2));
		expect(tuple2.hasValue()).toBeTruthy();
		expect(tuple2.toNullable()).toStrictEqual([1, 2]);

		const tuple3 = Option.zip(Option.some(1), Option.some(2), Option.some(3));
		expect(tuple3.hasValue()).toBeTruthy();
		expect(tuple3.toNullable()).toStrictEqual([1, 2, 3]);

		const tuple4 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4));
		expect(tuple4.hasValue()).toBeTruthy();
		expect(tuple4.toNullable()).toStrictEqual([1, 2, 3, 4]);

		const tuple5 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.some(5));
		expect(tuple5.hasValue()).toBeTruthy();
		expect(tuple5.toNullable()).toStrictEqual([1, 2, 3, 4, 5]);

		const tuple6 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.some(5), Option.some(6));
		expect(tuple6.hasValue()).toBeTruthy();
		expect(tuple6.toNullable()).toStrictEqual([1, 2, 3, 4, 5, 6]);

		const tuple7 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.some(5), Option.some(6), Option.some(7));
		expect(tuple7.hasValue()).toBeTruthy();
		expect(tuple7.toNullable()).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);

		const tuple8 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.some(5), Option.some(6), Option.some(7), Option.some(8));
		expect(tuple8.hasValue()).toBeTruthy();
		expect(tuple8.toNullable()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
	});

	test('zip returns none when any hase none', () => {
		var tuple2 = Option.zip(Option.some(1), Option.none<number>());
		expect(tuple2.hasValue()).toBeFalsy();

		const tuple3 = Option.zip(Option.some(1), Option.none<number>(), Option.some(3));
		expect(tuple3.hasValue()).toBeFalsy();

		const tuple4 = Option.zip(Option.some(1), Option.some(2), Option.none<number>(), Option.some(4));
		expect(tuple4.hasValue()).toBeFalsy();

		const tuple5 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.none<number>(), Option.some(5));
		expect(tuple5.hasValue()).toBeFalsy();

		const tuple6 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.none<number>(), Option.some(6));
		expect(tuple6.hasValue()).toBeFalsy();

		const tuple7 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.some(5), Option.none<number>(), Option.some(7));
		expect(tuple7.hasValue()).toBeFalsy();

		const tuple8 = Option.zip(Option.some(1), Option.some(2), Option.some(3), Option.some(4), Option.some(5), Option.some(6), Option.none<number>(), Option.some(8));
		expect(tuple8.hasValue()).toBeFalsy();
	});
});