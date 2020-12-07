import { ResultFactory, ResultPromise } from "../../src";

describe('Result', () => {
	describe('Match', () => {
		test('match returns success match when success', async () => {
			const result = ResultFactory.success<number, string>(50).match(success => success / 2, error => -1);
			expect(result).toBe(25);
		});
		test('match returns failure match when failure', async () => {
			const result = ResultFactory.failure<number, string>("test").match(success => success / 2, error => -1);
			expect(result).toBe(-1);
		});
		test('matchAsync returns success match when success', async () => {
			const result = await ResultFactory.success<number, string>(50).matchAsync(async success => success / 2, async error => -1);
			expect(result).toBe(25);
		});
		test('matchAsync returns failure match when failure', async () => {
			const result = await ResultFactory.failure<number, string>("test").matchAsync(async success => success / 2, async error => -1);
			expect(result).toBe(-1);
		});
	});

	describe('Base', () => {
		test('toString returns success string when success', async () => {
			const result = ResultFactory.success<number, Error>(50);
			expect(result.toString()).toBe("Success: 50");
		});
		test('toString returns failure string when failure', async () => {
			const result = ResultFactory.failure<number, Error>(new Error("TestError"));
			expect(result.toString()).toBe("Failure: Error: TestError");
		});
		test('isSuccess returns result when success', async () => {
			const result = ResultFactory.success<number, Error>(50);
			expect(result.isSuccess()).toBeTruthy();
		});
		test('isSuccess returns error when failure', async () => {
			const result = ResultFactory.failure<number, Error>(new Error());
			expect(result.isSuccess()).toBeFalsy();
		});
	});

	describe('Conversions', () => {
		test('success returns some when success', async () => {
			const option = ResultFactory.success<number, Error>(50).success();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(50);
		});
		test('success returns none when failure', async () => {
			const option = ResultFactory.failure<number, Error>(new Error()).success();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('failure returns none when success', async () => {
			const option = ResultFactory.success<number, Error>(50).failure();
			expect(option.hasValue()).toBeFalsy();
			expect(option.toNullable()).toBe(null);
		});
		test('failure returns some when failure', async () => {
			var error = new Error();
			const option = ResultFactory.failure<number, Error>(error).failure();
			expect(option.hasValue()).toBeTruthy();
			expect(option.toNullable()).toBe(error);
		});
		test('toPromise returns ResultPromise', async () => {
			const result = await ResultFactory.success<number, Error>(50).toPromise();
			expect(result.toString()).toBe((await ResultFactory.successAsync(async () => 50)).toString());
		});
	});

	describe('Map, Where, Bind', () => {
		test('map returns mapSuccess when success', async () => {
			const result = ResultFactory.success<number, Error>(50).map(success => "success");
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => "")).toBe("success");
		});
		test('map returns failure when failure', async () => {
			const result = ResultFactory.failure<number, string>("failure").map(success => "success");
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("failure");
		});
		test('mapAsync returns map when success', async () => {
			const result = await ResultFactory.success<number, Error>(50).mapAsync(async success => "success");
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => "")).toBe("success");
		});
		test('mapAsync returns failure when failure', async () => {
			const result = await ResultFactory.failure<number, string>("failure").mapAsync(async success => "success");
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("failure");
		});
		test('mapFailure returns success when success', async () => {
			const result = ResultFactory.success<number, string>(50).mapFailure(failure => 3);
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('mapFailure returns map when failure', async () => {
			const result = ResultFactory.failure<number, string>("failure").mapFailure(failure => 3);
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(3);
		});
		test('mapFailureAsync returns success when success', async () => {
			const result = await ResultFactory.success<number, Error>(50).mapFailureAsync(async failure => 3);
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('mapFailureAsync returns map when failure', async () => {
			const result = await ResultFactory.failure<number, string>("failure").mapFailureAsync(async failure => 3);
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(3);
		});
		test('tryMap returns map when success', async () => {
			const result = ResultFactory.success(100).tryMap(success => "success");
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => "")).toBe("success");
		});
		test('tryMap returns error when fails', async () => {
			const result = ResultFactory.success(100).tryMap(success => { throw new Error("error") });
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
		});
		test('tryMap returns mapfailure when fails with mapfailure', async () => {
			const result = ResultFactory.success<string, number>("100").tryMap(success => { throw new Error("error") }, e => 50);
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(50);
		});
		test('tryMap returns failure when already failed', async () => {
			const result = ResultFactory.failure<string, number>(100).tryMap(success => "success");
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(100);
		});
		test('tryMap returns failure when already failed and map throws error', async () => {
			const result = ResultFactory.failure<string, number>(100).tryMap(success => { throw new Error("error") });
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(100);
		});
		test('tryMapAsync returns map when success', async () => {
			const result = await ResultFactory.success(100).tryMapAsync(async success => "success");
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => "")).toBe("success");
		});
		test('tryMapAsync returns error when fails', async () => {
			const result = await ResultFactory.success(100).tryMapAsync(async success => { throw new Error("error") });
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
		});
		test('tryMapAsync returns mapfailure when fails with mapfailure', async () => {
			const result = await ResultFactory.success<string, number>("100").tryMapAsync(async success => { throw new Error("error") }, async e => 50);
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(50);
		});
		test('tryMapAsync returns failure when already failed', async () => {
			const result = await ResultFactory.failure<string, number>(100).tryMapAsync(async success => "success");
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(100);
		});
		test('tryMapAsync returns failure when already failed and map throws error', async () => {
			const result = await ResultFactory.failure<string, number>(100).tryMapAsync(async success => { throw new Error("error") });
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => 0)).toBe(100);
		});
		test('bind returns success when success', async () => {
			const result = ResultFactory.success<number, string>(50).bind(success => ResultFactory.success<string, string>(success.toString()));
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => "")).toBe("50");
		});
		test('bind returns failure when failure', async () => {
			const result = ResultFactory.failure<number, string>("failure").bind(success => ResultFactory.success<string, string>(success.toString()));
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("failure");
		});
		test('bindAsync returns success when success', async () => {
			const result = await ResultFactory.success<number, string>(50).bindAsync(async success => ResultFactory.success<string, string>(success.toString()));
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => "")).toBe("50");
		});
		test('bindAsync returns failure when failure', async () => {
			const result = await ResultFactory.failure<number, string>("failure").bindAsync(async success => ResultFactory.success<string, string>(success.toString()));
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("failure");
		});
		test('bindOnFailure returns success when success', async () => {
			const result = ResultFactory.success<number, string>(50).bindOnFailure(failure => ResultFactory.failure<number, string>(failure.toString()));
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('bindOnFailure returns failure when failure', async () => {
			const result = ResultFactory.failure<number, number>(40).bindOnFailure(failure => ResultFactory.failure<number, string>(failure.toString()));
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("40");
		});
		test('bindOnFailureAsync returns success when success', async () => {
			const result = await ResultFactory.success<number, string>(50).bindOnFailureAsync(failure => ResultFactory.failureAsync<number, string>(async () => failure.toString()));
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('bindOnFailureAsync returns failure when failure', async () => {
			const result = await ResultFactory.failure<number, number>(40).bindOnFailureAsync(failure => ResultFactory.failureAsync<number, string>(async () => failure.toString()));
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => "")).toBe("40");
		});
		test('where returns success when true', async () => {
			const result = ResultFactory.success<number, Error>(50).where(success => true, success => new Error());
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('where returns failure when is failure', async () => {
			var error = new Error();
			const result = ResultFactory.failure<number, Error>(error).where(success => true, success => new Error());
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(error);
		});
		test('where returns failure when false', async () => {
			var error = new Error();
			const result = ResultFactory.success<number, Error>(50).where(success => false, success => error);
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(error);
		});
		test('whereAsync returns success when true', async () => {
			const result = await ResultFactory.success<number, Error>(50).whereAsync(async success => true, async success => new Error());
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('whereAsync returns failure when is failure', async () => {
			var error = new Error();
			const result = await ResultFactory.failure<number, Error>(error).whereAsync(async success => true, async success => new Error());
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(error);
		});
		test('whereAsync returns failure when false', async () => {
			var error = new Error();
			const result = await ResultFactory.success<number, Error>(50).whereAsync(async success => false, async success => error);
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(error);
		});
	});
		
	describe('Do', () => {
		test('do executes success when success', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = ResultFactory.success<number, Error>(50).do(success => successExecuted = true, failure => failureExecuted = true);
			expect(successExecuted).toBeTruthy();
			expect(failureExecuted).toBeFalsy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('do executes failure when failure', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = ResultFactory.failure<number, Error>(new Error()).do(success => successExecuted = true, failure => failureExecuted = true);
			expect(successExecuted).toBeFalsy();
			expect(failureExecuted).toBeTruthy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doAsync executes success when success', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = await ResultFactory.success<number, Error>(50).doAsync(async success => { successExecuted = true }, async failure => { failureExecuted = true });
			expect(successExecuted).toBeTruthy();
			expect(failureExecuted).toBeFalsy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doAsync executes failure when failure', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).doAsync(async success => { successExecuted = true }, async failure => { failureExecuted = true });
			expect(successExecuted).toBeFalsy();
			expect(failureExecuted).toBeTruthy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doAlways executes success when success', async () => {
			var executed = false;
			const result = ResultFactory.success<number, Error>(50).doAlways(() => executed = true);
			expect(executed).toBeTruthy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doAlways executes failure when failure', async () => {
			var executed = false;
			const result = ResultFactory.failure<number, Error>(new Error()).doAlways(() => executed = true);
			expect(executed).toBeTruthy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doAlwaysAsync executes success when success', async () => {
			var executed = false;
			const result = await ResultFactory.success<number, Error>(50).doAlways(() => executed = true);
			expect(executed).toBeTruthy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doAlwaysAsync executes failure when failure', async () => {
			var executed = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).doAlways(() => executed = true);
			expect(executed).toBeTruthy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doIfSuccessful executes success when success', async () => {
			var successExecuted = false;
			const result = ResultFactory.success<number, Error>(50).doIfSuccessful(success => successExecuted = true);
			expect(successExecuted).toBeTruthy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doIfSuccessful executes failure when failure', async () => {
			var successExecuted = false;
			const result = ResultFactory.failure<number, Error>(new Error()).doIfSuccessful(success => successExecuted = true);
			expect(successExecuted).toBeFalsy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doIfSuccessfulAsync executes when success', async () => {
			var successExecuted = false;
			const result = await ResultFactory.success<number, Error>(50).doIfSuccessfulAsync(async success => { successExecuted = true });
			expect(successExecuted).toBeTruthy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doIfSuccessfulAsync does not execute when failure', async () => {
			var successExecuted = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).doIfSuccessfulAsync(async success => { successExecuted = true });
			expect(successExecuted).toBeFalsy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doIfFailure does not execute when success', async () => {
			var failureExecuted = false;
			const result = ResultFactory.success<number, Error>(50).doIfFailure(failure => failureExecuted = true);
			expect(failureExecuted).toBeFalsy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doIfFailure executes when failure', async () => {
			var failureExecuted = false;
			const result = ResultFactory.failure<number, Error>(new Error()).doIfFailure(failure => failureExecuted = true);
			expect(failureExecuted).toBeTruthy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
		test('doIfFailureAsync does not execute when success', async () => {
			var failureExecuted = false;
			const result = await ResultFactory.success<number, Error>(50).doIfFailureAsync(async failure => { failureExecuted = true });
			expect(failureExecuted).toBeFalsy();
			expect(result.isSuccess()).toBeTruthy();
			expect(result.success().valueOrDefault(() => 0)).toBe(50);
		});
		test('doIfFailureAsync executes when failure', async () => {
			var failureExecuted = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).doIfFailureAsync(async failure => { failureExecuted = true });
			expect(failureExecuted).toBeTruthy();
			expect(result.isSuccess()).toBeFalsy();
			expect(result.failure().valueOrDefault(() => new Error("Not the same error"))).toStrictEqual(new Error());
		});
	});

	describe('Apply', () => {
		test('apply executes success when success', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = ResultFactory.success<number, Error>(50).apply(success => successExecuted = true, failure => failureExecuted = true);
			expect(successExecuted).toBeTruthy();
			expect(failureExecuted).toBeFalsy();
		});
		test('apply executes failure when failure', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = ResultFactory.failure<number, Error>(new Error()).apply(success => successExecuted = true, failure => failureExecuted = true);
			expect(successExecuted).toBeFalsy();
			expect(failureExecuted).toBeTruthy();
		});
		test('applyAsync executes success when success', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = await ResultFactory.success<number, Error>(50).applyAsync(async success => { successExecuted = true }, async failure => { failureExecuted = true });
			expect(successExecuted).toBeTruthy();
			expect(failureExecuted).toBeFalsy();
		});
		test('applyAsync executes failure when failure', async () => {
			var successExecuted = false;
			var failureExecuted = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).applyAsync(async success => { successExecuted = true }, async failure => { failureExecuted = true });
			expect(successExecuted).toBeFalsy();
			expect(failureExecuted).toBeTruthy();
		});
		test('applyAlways executes success when success', async () => {
			var executed = false;
			const result = ResultFactory.success<number, Error>(50).applyAlways(() => executed = true);
			expect(executed).toBeTruthy();
		});
		test('applyAlways executes failure when failure', async () => {
			var executed = false;
			const result = ResultFactory.failure<number, Error>(new Error()).applyAlways(() => executed = true);
			expect(executed).toBeTruthy();
		});
		test('applyAlwaysAsync executes success when success', async () => {
			var executed = false;
			const result = await ResultFactory.success<number, Error>(50).applyAlways(() => executed = true);
			expect(executed).toBeTruthy();
		});
		test('applyAlwaysAsync executes failure when failure', async () => {
			var executed = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).applyAlways(() => executed = true);
			expect(executed).toBeTruthy();
		});
		test('applyIfSuccessful executes success when success', async () => {
			var successExecuted = false;
			const result = ResultFactory.success<number, Error>(50).applyIfSuccessful(success => successExecuted = true);
			expect(successExecuted).toBeTruthy();
		});
		test('applyIfSuccessful executes failure when failure', async () => {
			var successExecuted = false;
			const result = ResultFactory.failure<number, Error>(new Error()).applyIfSuccessful(success => successExecuted = true);
			expect(successExecuted).toBeFalsy();
		});
		test('applyIfSuccessfulAsync executes when success', async () => {
			var successExecuted = false;
			const result = await ResultFactory.success<number, Error>(50).applyIfSuccessfulAsync(async success => { successExecuted = true });
			expect(successExecuted).toBeTruthy();
		});
		test('applyIfSuccessfulAsync does not execute when failure', async () => {
			var successExecuted = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).applyIfSuccessfulAsync(async success => { successExecuted = true });
			expect(successExecuted).toBeFalsy();
		});
		test('applyIfFailure does not execute when success', async () => {
			var failureExecuted = false;
			const result = ResultFactory.success<number, Error>(50).applyIfFailure(failure => failureExecuted = true);
			expect(failureExecuted).toBeFalsy();
		});
		test('applyIfFailure executes when failure', async () => {
			var failureExecuted = false;
			const result = ResultFactory.failure<number, Error>(new Error()).applyIfFailure(failure => failureExecuted = true);
			expect(failureExecuted).toBeTruthy();
		});
		test('applyIfFailureAsync does not execute when success', async () => {
			var failureExecuted = false;
			const result = await ResultFactory.success<number, Error>(50).applyIfFailureAsync(async failure => { failureExecuted = true });
			expect(failureExecuted).toBeFalsy();
		});
		test('applyIfFailureAsync executes when failure', async () => {
			var failureExecuted = false;
			const result = await ResultFactory.failure<number, Error>(new Error()).applyIfFailureAsync(async failure => { failureExecuted = true });
			expect(failureExecuted).toBeTruthy();
		});
	});
});