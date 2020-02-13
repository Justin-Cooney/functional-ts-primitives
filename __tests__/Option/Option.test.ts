import { OptionFactory, Option, Unit } from "../../src";

describe('Option', () => {
	describe('Factory Methods', () => {
		test('some returns option with value', () => {
			const option = OptionFactory.some(100);
			expect(option.hasValue()).toBeTruthy();
			expect(option.match(x => 100, () => 34)).toBe(100);
		});
		test('none returns empty option', () => {
			const option = OptionFactory.none<number>();
			expect(option.hasValue()).toBeFalsy();
			expect(option.match(x => 100, () => 34)).toBe(34);
		});
		test('create returns empty when false', async () => {
			const option = OptionFactory.create<number>(false, () => 50);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('create returns value when true', async () => {
			const option = OptionFactory.create<number>(true, () => 50);
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
			const option = OptionFactory.where(true);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(Unit);
		});
		test('where returns empty when false', () => {
			const option = OptionFactory.where(false);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});
	describe('Conversions', () => {
		test('defaultIfNone returns current when has some', () => {
			const option = OptionFactory.some<number>(50).defaultIfNone(20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('defaultIfNone returns default when empty', () => {
			const option = OptionFactory.none<number>().defaultIfNone(20);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(20);
		});
		test('toNullable returns some when has value', () => {
			const option = OptionFactory.some(50).toNullable();
			expect(option).toBe(50);
		});
		test('toNullable returns null when empty', () => {
			const option = OptionFactory.none<number>().toNullable();
			expect(option).toBe(null);
		});
	});

	describe('Base', () => {
		test('toString returns some string when some', () => {
			var result : Option<number> = OptionFactory.some(50);
			expect(result.toString()).toBe("Some: 50");
		});
		test('toString returns none string when none', () => {
			const result = OptionFactory.none<number>();
			expect(result.toString()).toBe("None");
		});
		test('hasValue returns true when has value', () => {
			const option = OptionFactory.some<number>(50);
			expect(option.hasValue()).toBeTruthy();
		});
		test('hasValue returns false when empty', () => {
			const option = OptionFactory.none<number>();
			expect(option.hasValue()).toBeFalsy();
		});
		test('valueOrDefault returns value when has value', () => {
			const option = OptionFactory.some<number>(50);
			expect(option.valueOrDefault(10)).toBe(50);
		});
		test('valueOrDefault returns default when has none', () => {
			const option = OptionFactory.none<number>();
			expect(option.valueOrDefault(10)).toBe(10);
		});
	});
	describe('Match, Map, Bind, Where', () => {
		test('match returns correct value when has some', () => {
			const option = OptionFactory.some<number>(50);
			expect(option.match(some => true, () => false)).toBeTruthy();
		});
		test('match returns correct value when empty', () => {
			const option = OptionFactory.none<number>();
			expect(option.match(some => false, () => true)).toBeTruthy();
		});
		test('map returns correct value when has some', () => {
			const option = OptionFactory.some<number>(100).map<number>(some => some / 2);
			expect(option.hasValue()).toBeTruthy();
			expect(option.match(s => s, () => 0)).toBe(50);
		});
		test('map returns correct value when empty', () => {
			const option = OptionFactory.none<number>().map(some => some / 2);
			expect(option.hasValue()).toBeFalsy();
			expect(option.match(s => s, () => 0)).toBe(0);
		});
		test('bind returns correct value when has some', () => {
			const option = OptionFactory.some<number>(50).bind(some => OptionFactory.some(some / 2));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('bind returns correct value when empty', () => {
			const option = OptionFactory.none<number>().bind(some => OptionFactory.some(some / 2));
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('bindOnNone returns correct value when has some', () => {
			const option = OptionFactory.some<number>(50).bindOnNone(() => OptionFactory.some(25));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('bindOnNone returns correct value when empty', () => {
			const option = OptionFactory.none<number>().bindOnNone(() => OptionFactory.some(25));
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(25);
		});
		test('where returns some when true', () => {
			const option = OptionFactory.some(100).where(some => true);
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(100);
		});
		test('where returns empty when false', () => {
			const option = OptionFactory.some(100).where(some => false);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('where returns empty when none', () => {
			const option = OptionFactory.none().where(some => true);
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});

	describe('Do', () => {
		test('do executes some method when some', () => {
			var methodExecuted = false;
			const option = OptionFactory.some(50).do(some => { methodExecuted = true; }, () => {});
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('do executes none method when none', () => {
			var methodExecuted = false;
			const option = OptionFactory.none<number>().do(some => { }, () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfSome executes when some', () => {
			var methodExecuted = false;
			const option = OptionFactory.some(50).doIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfSome no execution  when none', () => {
			var methodExecuted = false;
			const option = OptionFactory.none<number>().doIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('doIfNone no execution when some', () => {
			var methodExecuted = false;
			const option = OptionFactory.some(50).doIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('doIfNone execution when none', () => {
			var methodExecuted = false;
			const option = OptionFactory.none<number>().doIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
	});

	describe('Apply', () => {
		test('apply executes some method when some', () => {
			var methodExecuted = false;
			OptionFactory.some(50).apply(some => { methodExecuted = true; }, () => {});
			expect(methodExecuted).toBeTruthy();
		});
		test('apply executes none method when none', () => {
			var methodExecuted = false;
			OptionFactory.none<number>().apply(some => { }, () => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSome execution when some', () => {
			var methodExecuted = false;
			OptionFactory.some(50).applyIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
		test('applyIfSome no execution when none', () => {
			var methodExecuted = false;
			OptionFactory.none<number>().applyIfSome(some => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNone no execution when some', () => {
			var methodExecuted = false;
			OptionFactory.some(50).applyIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeFalsy();
		});
		test('applyIfNone execution when none', () => {
			var methodExecuted = false;
			OptionFactory.none<number>().applyIfNone(() => { methodExecuted = true; });
			expect(methodExecuted).toBeTruthy();
		});
	});
});