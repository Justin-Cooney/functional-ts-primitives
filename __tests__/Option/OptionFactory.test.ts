import { OptionFactory, Unit } from "../../src";

describe('Factory Methods', () => {
	test('some returns option with value', () => {
		const option = OptionFactory.some(100);
		expect(option.hasValue()).toBeTruthy();
		expect(option.match(x => 100, () => 34)).toBe(100);
	});
	test('someAsync returns option with value', async () => {
		const option = await OptionFactory.someAsync(async () => 100);
		expect(option.hasValue()).toBeTruthy();
		expect(option.match(x => 100, () => 34)).toBe(100);
	});
	test('none returns empty option', () => {
		const option = OptionFactory.none<number>();
		expect(option.hasValue()).toBeFalsy();
		expect(option.match(x => 100, () => 34)).toBe(34);
	});
	test('none returns empty option', async () => {
		const option = await OptionFactory.noneAsync<number>();
		expect(option.hasValue()).toBeFalsy();
		expect(option.match(x => 100, () => 34)).toBe(34);
	});
	test('create returns empty when false', async () => {
		const option = OptionFactory.create<number>(() => false, () => 50);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('create returns value when true', async () => {
		const option = OptionFactory.create<number>(() => true, () => 50);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(50);
	});
	test('createAsync returns empty when false', async () => {
		const option = await OptionFactory.createAsync<number>(async () => false, async () => 50);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('createAsync returns value when true', async () => {
		const option = await OptionFactory.createAsync<number>(async () => true, async () => 50);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(50);
	});
	test('fromNullable returns empty when using null', async () => {
		const option = OptionFactory.fromNullable<number>(null);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('fromNullable returns empty when using undefined', async () => {
		const option = OptionFactory.fromNullable<number>(undefined);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('fromNullable returns value when using value', async () => {
		const option = OptionFactory.fromNullable<number>(50);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(50);
	});
	test('where returns unit when true', () => {
		const option = OptionFactory.where(() => true);
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(Unit);
	});
	test('where returns empty when false', () => {
		const option = OptionFactory.where(() => false);
		expect(option.hasValue()).toBeFalsy();
		expect(option.toNullable()).toBe(null);
	});
	test('unit returns unit', () => {
		const option = OptionFactory.unit();
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(Unit);
	});
});