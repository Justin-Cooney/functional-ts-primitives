import { Unit } from "../../src";
import { Option } from "../../src/OptionV2/Option";

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
	// test('create returns empty when false', async () => {
	// 	const option = Option.create<number>(() => false, () => 50);
	// 	expect(option.hasValue()).toBeFalsy();
	// 	expect(option.toNullable()).toBe(null);
	// });
	// test('create returns value when true', async () => {
	// 	const option = Option.create<number>(() => true, () => 50);
	// 	expect(option.hasValue()).toBeTruthy();
	// 	expect(option.toNullable()).toBe(50);
	// });
	// test('createAsync returns empty when false', async () => {
	// 	const option = await Option.createAsync<number>(async () => false, async () => 50);
	// 	expect(option.hasValue()).toBeFalsy();
	// 	expect(option.toNullable()).toBe(null);
	// });
	// test('createAsync returns value when true', async () => {
	// 	const option = await Option.createAsync<number>(async () => true, async () => 50);
	// 	expect(option.hasValue()).toBeTruthy();
	// 	expect(option.toNullable()).toBe(50);
	// });
	// test('fromNullable returns empty when using null', async () => {
	// 	const option = Option.fromNullable<number>(null);
	// 	expect(option.hasValue()).toBeFalsy();
	// 	expect(option.toNullable()).toBe(null);
	// });
	// test('fromNullable returns empty when using undefined', async () => {
	// 	const option = Option.fromNullable<number>(undefined);
	// 	expect(option.hasValue()).toBeFalsy();
	// 	expect(option.toNullable()).toBe(null);
	// });
	// test('fromNullable returns value when using value', async () => {
	// 	const option = Option.fromNullable<number>(50);
	// 	expect(option.hasValue()).toBeTruthy();
	// 	expect(option.toNullable()).toBe(50);
	// });
	// test('where returns unit when true', () => {
	// 	const option = Option.where(() => true);
	// 	expect(option.hasValue()).toBeTruthy();
	// 	expect(option.toNullable()).toBe(Unit);
	// });
	// test('where returns empty when false', () => {
	// 	const option = Option.where(() => false);
	// 	expect(option.hasValue()).toBeFalsy();
	// 	expect(option.toNullable()).toBe(null);
	// });
	// test('unit returns unit', () => {
	// 	const option = Option.unit();
	// 	expect(option.hasValue()).toBeTruthy();
	// 	expect(option.toNullable()).toBe(Unit);
	// });
});