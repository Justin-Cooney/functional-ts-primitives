import { Unit } from "../../src";
import { Option } from "../../src/OptionV2/Option";

describe('Option', () => {
	test('can use multiple extensions', () => {
		const option = Option.some(100).map(x => x * 2).bind(x => Option.some(x - 1));
		expect(option.hasValue()).toBeTruthy();
		expect(option.toNullable()).toBe(199);
	});

	describe('Match', () => {
		test('match returns correct value when has some', () => {
			const option = Option.some<number>(50);
			expect(option.match(some => true, () => false)).toBeTruthy();
		});
		test('match returns correct value when empty', () => {
			const option = Option.none<number>();
			expect(option.match(some => false, () => true)).toBeTruthy();
		});
		test('matchAsync returns correct value when has some', async () => {
			const option = Option.some<number>(50);
			expect(await option.matchAsync( async some => true, async () => false)).toBeTruthy();
		});
		test('matchAsync returns correct value when has none', async () => {
			const option = Option.none<number>();
			expect(await option.matchAsync(async some => false, async () => true)).toBeTruthy();
		});
	});

	describe('Base', () => {
		test('toString returns some string when some', () => {
			var option = Option.some(50);
			expect(option.toString()).toBe("Some: 50");
		});
		test('toString returns none string when none', () => {
			const option = Option.none<number>();
			expect(option.toString()).toBe("None");
		});
		test('hasValue returns true when has value', () => {
			const option = Option.some<number>(50);
			expect(option.hasValue()).toBeTruthy();
		});
		test('hasValue returns false when empty', () => {
			const option = Option.none<number>();
			expect(option.hasValue()).toBeFalsy();
		});
		test('valueOrDefault returns value when has value', () => {
			const option = Option.some<number>(50);
			expect(option.valueOrDefault(() => 10)).toBe(50);
		});
		test('valueOrDefault returns default when has none', () => {
			const option = Option.none<number>();
			expect(option.valueOrDefault(() => 10)).toBe(10);
		});
		test('valueOrDefaultAsync returns value when has value', async () => {
			const option = Option.some<number>(50);
			expect(await option.valueOrDefaultAsync(async () => 10)).toBe(50);
		});
		test('valueOrDefaultAsync returns default when has none', async () => {
			const option = Option.none<number>();
			expect(await option.valueOrDefaultAsync(async () => 10)).toBe(10);
		});
	});

	describe('Conversions', () => {
		test('defaultIfNone returns current when has some', () => {
			const option = Option.some<number>(50).defaultIfNone(() => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('defaultIfNone returns default when empty', () => {
			const option = Option.none<number>().defaultIfNone(() => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(20);
		});
		test('defaultIfNoneAsync returns current when has some', async () => {
			const option = await Option.some<number>(50).defaultIfNoneAsync(async () => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('defaultIfNoneAsync returns default when empty', async () => {
			const option = await Option.none<number>().defaultIfNoneAsync(async () => 20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(20);
		});
		test('toNullable returns some when has value', () => {
			const option = Option.some(50).toNullable();
			expect(option).toBe(50);
		});
		test('toNullable returns null when empty', () => {
			const option = Option.none<number>().toNullable();
			expect(option).toBe(null);
		});
		test('toPromise returns OptionPromise when some', async () => {
			const option = Option.some<number>(50).toPromise();
			expect(option.toString()).toStrictEqual(Option.someAsync(async () => 50).toString());
			expect(await option.toNullable()).toBe(50);
		});
		test('toPromise returns OptionPromise when none', async () => {
			const option = Option.none<number>().toPromise();
			expect(option.toString()).toStrictEqual(Option.noneAsync<number>().toString());
			expect(await option.toNullable()).toBe(null);
		});
		// test('toResult returns success when some', () => {
		// 	const result = Option.some(50).toResult(() => "test");
		// 	expect(result.isSuccess()).toBeTruthy();
		// 	expect(result.success().valueOrDefault(() => 100)).toBe(50);
		// });
		// test('toResult returns failure when none', () => {
		// 	const result = Option.none<number>().toResult(() => "test");
		// 	expect(result.isSuccess()).toBeFalsy();
		// 	expect(result.failure().valueOrDefault(() => "")).toBe("test");
		// });
		// test('toResultAsync returns success when some', async () => {
		// 	const result = await Option.some(50).toResultAsync(async () => "test");
		// 	expect(result.isSuccess()).toBeTruthy();
		// 	expect(result.success().valueOrDefault(() => 100)).toBe(50);
		// });
		// test('toResultAsync returns failure when none', async () => {
		// 	const result = await Option.none<number>().toResultAsync(async () => "test");
		// 	expect(result.isSuccess()).toBeFalsy();
		// 	expect(result.failure().valueOrDefault(() => "")).toBe("test");
		// });
	});

	describe('Map, Bind, Where', () => {
		test('map returns correct value when has some', () => {
			const option = Option.some<number>(100).map<number>(some => some / 2);
			expect(option.hasValue()).toBeTruthy();
			expect(option.match(s => s, () => 0)).toBe(50);
		});
		test('map returns correct value when empty', () => {
			const option = Option.none<number>().map(some => some / 2);
			expect(option.hasValue()).toBeFalsy();
			expect(option.match(s => s, () => 0)).toBe(0);
		});
		test('mapAsync returns correct value when has some', async () => {
			const option = await Option.some<number>(50).mapAsync(async some => some / 2);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('mapAsync returns correct value when empty', async () => {
			const option = await Option.none<number>().mapAsync(async some => some / 2);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('bind returns correct value when has some', () => {
			const option = Option.some<number>(50).bind(some => Option.some(some / 2));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('bind returns correct value when empty', () => {
			const option = Option.none<number>().bind(some => Option.some(some / 2));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('bindAsync returns correct value when has some', async () => {
			const option = await Option.some<number>(50).bindAsync(some => Option.someAsync(async () => some / 2));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('bindAsync returns correct value when empty', async () => {
			const option = await Option.none<number>().bindAsync(some => Option.someAsync(async () => some / 2));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('bindOnNone returns correct value when has some', () => {
			const option = Option.some<number>(50).bindOnNone(() => Option.some(25));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('bindOnNone returns correct value when empty', () => {
			const option = Option.none<number>().bindOnNone(() => Option.some(25));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('bindOnNoneAsync returns correct value when has some', async () => {
			const option = await Option.some<number>(50).bindOnNoneAsync(() => Option.some(25).toPromise());
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('bindOnNoneAsync returns correct value when empty', async () => {
			const option = await Option.none<number>().bindOnNoneAsync(() => Option.some(25).toPromise());
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('where returns some when true', () => {
			const option = Option.some(100).where(some => true);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(100);
		});
		test('where returns empty when false', () => {
			const option = Option.some(100).where(some => false);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('where returns empty when none', () => {
			const option = Option.none().where(some => true);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('whereAsync returns some when true', async () => {
			const option = await Option.some(100).whereAsync(async some => true);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(100);
		});
		test('whereAsync returns empty when false', async () => {
			const option = await Option.some(100).whereAsync(async some => Promise.resolve(false));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('whereAsync returns empty when none', async () => {
			const option = await Option.none().whereAsync(async some => true);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});

	describe('Do', () => {
		test('do executes some method when some', () => {
			var methodExecuted = false;
			const option = Option.some(50).do(some => { methodExecuted = true; }, () => {});
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('do executes none method when none', () => {
			var methodExecuted = false;
			const option = Option.none<number>().do(some => { }, () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doAsync executes some method when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).doAsync(async some => { methodExecuted = true; }, async () => {});
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doAsync executes none method when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().doAsync(async some => { }, async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doAlways executes some method when some', () => {
			var methodExecuted = false;
			const option = Option.some(50).doAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doAlways executes none method when none', () => {
			var methodExecuted = false;
			const option = Option.none<number>().doAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doAlwaysAsync executes some method when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).doAlwaysAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doAlwaysAsync executes none method when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().doAlwaysAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfSome executes when some', () => {
			var methodExecuted = false;
			const option = Option.some(50).doIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfSome no execution  when none', () => {
			var methodExecuted = false;
			const option = Option.none<number>().doIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfSomeAsync executes when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).doIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfSomeAsync no execution  when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().doIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfNone no execution when some', () => {
			var methodExecuted = false;
			const option = Option.some(50).doIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfNone execution when none', () => {
			var methodExecuted = false;
			const option = Option.none<number>().doIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfNoneAsync no execution when some', async () => {
			var methodExecuted = false;
			const option = await Option.some(50).doIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfNoneAsync execution when none', async () => {
			var methodExecuted = false;
			const option = await Option.none<number>().doIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});

	describe('Apply', () => {
		test('apply executes some method when some', () => {
			var methodExecuted = false;
			Option.some(50).apply(some => { methodExecuted = true; }, () => {});
			expect(methodExecuted).toBeTruthy();
		});
		test('apply executes none method when none', () => {
			var methodExecuted = false;
			Option.none<number>().apply(some => { }, () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAsync executes some method when some', async () => {
			var methodExecuted = false;
			await Option.some(50).applyAsync(async some => { methodExecuted = true; }, async () => {});
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAsync executes none method when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().applyAsync(async some => { }, async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlways executes when some', () => {
			var methodExecuted = false;
			Option.some(50).applyAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlways executes when none', () => {
			var methodExecuted = false;
			Option.none<number>().applyAlways(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlwaysAsync executes when some', async () => {
			var methodExecuted = false;
			await Option.some(50).applyAlways(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyAlwaysAsync executes when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().applyAlways(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSome execution when some', () => {
			var methodExecuted = false;
			Option.some(50).applyIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSome no execution when none', () => {
			var methodExecuted = false;
			Option.none<number>().applyIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfSomeAsync execution when some', async () => {
			var methodExecuted = false;
			await Option.some(50).applyIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSomeAsync no execution when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().applyIfSomeAsync(async some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNone no execution when some', () => {
			var methodExecuted = false;
			Option.some(50).applyIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNone execution when none', () => {
			var methodExecuted = false;
			Option.none<number>().applyIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfNoneAsync no execution when some', async () => {
			var methodExecuted = false;
			await Option.some(50).applyIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNoneAsync execution when none', async () => {
			var methodExecuted = false;
			await Option.none<number>().applyIfNoneAsync(async () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
	});
});