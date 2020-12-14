import { Option } from "../../src";

describe('OptionPromise', () => {
	describe('Match', () => {
		test('match returns correct value when has some', async () => {
			expect(await Option.some<number>(50).toPromise().match(some => true, () => false)).toBeTruthy();
		});
		test('match returns correct value when empty', async () => {
			expect(await Option.none<number>().toPromise().match(some => false, () => true)).toBeTruthy();
		});
		test('matchAsync returns correct value when has some', async () => {
			expect(await Option.some<number>(50).toPromise().matchAsync( async some => true, async () => false)).toBeTruthy();
		});
		test('matchAsync returns correct value when has none', async () => {
			expect(await Option.none<number>().toPromise().matchAsync(async some => false, async () => true)).toBeTruthy();
		});
	});

	describe('Base', () => {
		test('toStringAsync returns some string when some', async () => {
			expect(await Option.some(50).toPromise().toStringAsync()).toBe("Some: 50");
		});
		test('toStringAsync returns none string when none', async () => {
			expect(await Option.none<number>().toPromise().toStringAsync()).toBe("None");
		});
		test('hasValue returns true when has value', async () => {
			expect(await Option.some<number>(50).toPromise().hasValue()).toBeTruthy();
		});
		test('hasValue returns false when empty', async () => {
			expect(await Option.none<number>().toPromise().hasValue()).toBeFalsy();
		});
		test('valueOrDefault returns value when has value', async () => {
			expect(await Option.some<number>(50).toPromise().valueOrDefault(() => 10)).toBe(50);
		});
		test('valueOrDefault returns default when has none', async () => {
			expect(await Option.none<number>().toPromise().valueOrDefault(() => 10)).toBe(10);
		});
		test('valueOrDefaultAsync returns value when has value', async () => {
			expect(await Option.some<number>(50).toPromise().valueOrDefaultAsync(async () => 10)).toBe(50);
		});
		test('valueOrDefaultAsync returns default when has none', async () => {
			expect(await Option.none<number>().toPromise().valueOrDefaultAsync(async () => 10)).toBe(10);
		});
	});

	describe('Conversions', () => {
		test('defaultIfNone returns current when has some', async () => {
			const option = await Option.some<number>(50).toPromise().defaultIfNone(() => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('defaultIfNone returns default when empty', async () => {
			const option = await Option.none<number>().toPromise().defaultIfNone(() => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(20);
		});
		test('defaultIfNoneAsync returns current when has some', async () => {
			const option = await Option.some<number>(50).toPromise().defaultIfNoneAsync(async () => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('defaultIfNoneAsync returns default when empty', async () => {
			const option = await Option.none<number>().toPromise().defaultIfNoneAsync(async () => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(20);
		});
		test('toNullable returns some when has value', async () => {
			const option = await Option.some(50).toPromise().toNullable();
			expect(option).toBe(50);
		});
		test('toNullable returns null when empty', async () => {
			const option = await Option.none<number>().toPromise().toNullable();
			expect(option).toBe(null);
		});
		test('valueOrUndefined returns some when has value', async () => {
			const option = await Option.some(50).toPromise().valueOrUndefined();
			expect(option).toBe(50);
		});
		test('valueOrUndefined returns undefined when empty', async () => {
			const option = await Option.none<number>().toPromise().valueOrUndefined();
			expect(option).toBe(undefined);
		});
		test('toResult returns success when some', async () => {
			const result = await Option.someAsync(async () => 50).toResult(() => "test");
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 100)).toBe(50);
		});
		test('toResult returns failure when none', async () => {
			const result = await Option.noneAsync<number>().toResult(() => "test");
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("test");
		});
		test('toResultAsync returns success when some', async () => {
			const result = await Option.someAsync(async () => 50).toResultAsync(async () => "test");
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 100)).toBe(50);
		});
		test('toResultAsync returns failure when none', async () => {
			const result = await Option.noneAsync<number>().toResultAsync(async () => "test");
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("test");
		});
		test('toArray returns array when some', async () => {
			const array = await Option.some(50).toPromise().toArray();
			expect(array).toStrictEqual([50]);
		});
		test('toArray returns empty array when none', async () => {
			const array = await Option.none<number>().toPromise().toArray();
			expect(array).toStrictEqual([]);
		});
		test('throwOnNone returns value when some', async () => {
			const value = await Option.some(50).toPromise().throwOnNone(() => new Error("Some Error"));
			expect(value).toBe(50);
		});
		test('throwOnNone throws error when none', async () => {
			expect(Option.none<number>().toPromise().throwOnNone(() => new Error("Some Error"))).rejects.toContain(new Error("Some Error"));
		});
	});

	describe('Map, Bind, Where', () => {
		test('map returns correct value when has some', async () => {
			const option = await Option.some<number>(100).toPromise().map<number>(some => some / 2);
			expect(option.hasValue()).toBeTruthy();
			expect(option.match(s => s, () => 0)).toBe(50);
		});
		test('map returns correct value when empty', async () => {
			const option = await Option.none<number>().toPromise().map(some => some / 2);
			expect(option.hasValue()).toBeFalsy();
			expect(option.match(s => s, () => 0)).toBe(0);
		});
		test('mapAsync returns correct value when has some', async () => {
			const option = await Option.some<number>(50).toPromise().mapAsync(async some => some / 2);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('mapAsync returns correct value when empty', async () => {
			const option = await Option.none<number>().toPromise().mapAsync(async some => some / 2);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('bind returns correct value when has some', async () => {
			const option = await Option.some<number>(50).toPromise().bind(some => Option.some(some / 2));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('bind returns correct value when empty', async () => {
			const option = await Option.none<number>().toPromise().bind(some => Option.some(some / 2));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('bindAsync returns correct value when has some', async () => {
			const option = await Option.some<number>(50).toPromise().bindAsync(some => Option.someAsync(async () => some / 2));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('bindAsync returns correct value when empty', async () => {
			const option = await Option.none<number>().toPromise().bindAsync(some => Option.someAsync(async () => some / 2));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('where returns some when true', async () => {
			const option = await Option.some(100).toPromise().where(some => true);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(100);
		});
		test('where returns empty when false', async () => {
			const option = await Option.some(100).toPromise().where(some => false);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('where returns empty when none', async () => {
			const option = await Option.none().toPromise().where(some => true);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('whereAsync returns some when true', async () => {
			const option = await Option.some(100).toPromise().whereAsync(async some => true);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(100);
		});
		test('whereAsync returns empty when false', async () => {
			const option = await Option.some(100).toPromise().whereAsync(async some => Promise.resolve(false));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('whereAsync returns empty when none', async () => {
			const option = await Option.none().toPromise().whereAsync(async some => true);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});

	describe('Do', () => {
		test('do executes some method when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().do(some => { methodExecuted = true; }, () => {});
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('do executes none method when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().do(some => { }, () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doAsync executes some method when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doAsync(async some => { methodExecuted = true; }, async () => {});
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doAsync executes none method when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doAsync(async some => { }, async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doAlways executes some method when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doAlways executes none method when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doAlwaysAsync executes some method when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doAlwaysAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doAlwaysAsync executes none method when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doAlwaysAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfSome executes when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfSome no execution  when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfSomeAsync executes when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfSomeAsync no execution  when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfNone no execution when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfNone execution when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfNoneAsync no execution when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).toPromise().doIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfNoneAsync execution when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().toPromise().doIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});

	
	describe('Apply', () => {
		test('apply executes some method when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().apply(some => { methodExecuted = true; }, () => {});
			expect(methodExecuted).toBeTruthy();
		});
		test('apply executes none method when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().apply(some => { }, () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAsync executes some method when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyAsync(async some => { methodExecuted = true; }, async () => {});
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAsync executes none method when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyAsync(async some => { }, async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlways executes when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlways executes when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlwaysAsync executes when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyAlways(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlwaysAsync executes when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyAlways(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSome execution when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSome no execution when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfSomeAsync execution when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSomeAsync no execution when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNone no execution when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNone execution when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfNoneAsync no execution when some', async () => {
			var methodExecuted = false;
			await Option.some(50).toPromise().applyIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNoneAsync execution when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().toPromise().applyIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
	});

	describe('Array Extensions', () => {
		test('valueOrEmpty returns array when has some', async () => {
			var array = await Option.some([1, 2, 3, 4]).toPromise().valueOrEmpty();
			expect(array).toStrictEqual([1, 2, 3, 4]);
		});

		test('valueOrEmpty returns empty array when has none', async () => {
			var array = await Option.none<number[]>().toPromise().valueOrEmpty();
			expect(array).toStrictEqual([]);
		});
	});
});