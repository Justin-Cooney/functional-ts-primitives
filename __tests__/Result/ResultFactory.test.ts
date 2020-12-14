import { Result } from "../../src";

describe('Result Factory', () => {
	test('success returns result with success', async () => {
		const result = Result.success<number, string>(50);
		expect(result.isSuccess()).toBeTruthy();
		expect(result.success().valueOrDefault(() => 1)).toBe(50);
		expect(result.match(s => 1, f => 2)).toBe(1);
	});
	test('successAsync returns result with success', async () => {
		const result = await Result.successAsync<number, string>(async () => 50);
		expect(result.isSuccess()).toBeTruthy();
		expect(result.success().valueOrDefault(() => 1)).toBe(50);
		expect(result.match(s => 1, f => 2)).toBe(1);
	});
	test('failure returns result with failure', async () => {
		const result = Result.failure<number, string>("test");
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => "")).toBe("test");
		expect(result.match(s => 1, f => 2)).toBe(2);
	});
	test('failureAsync returns result with success', async () => {
		const result = await Result.failureAsync<number, string>(async () => "test");
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => "")).toBe("test");
		expect(result.match(s => 1, f => 2)).toBe(2);
	});
	test('create returns result with success when success is true', async () => {
		const result = Result.create<number, string>(() => true, () => 50, () => "test");
		expect(result.isSuccess()).toBeTruthy();
		expect(result.success().valueOrDefault(() => 1)).toBe(50);
	});
	test('create returns result with error when success is false', async () => {
		const result = Result.create<number, string>(() => false, () => 50, () => "test");
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => "")).toBe("test");
	});
	test('createAsync returns result with success when success is true', async () => {
		const result = await Result.createAsync<number, string>(async () => true, async () => 50, async () => "test");
		expect(result.isSuccess()).toBeTruthy();
		expect(result.success().valueOrDefault(() => 1)).toBe(50);
	});
	test('createAsync returns result with error when success is false', async () => {
		const result = await Result.createAsync<number, string>(async () => false, async () => 50, async () => "test");
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => "")).toBe("test");
	});
	test('try returns unit when successful', async () => {
		const result = Result.try(() => 50);
		expect(result.isSuccess()).toBeTruthy();
		expect(result.success().valueOrDefault(() => 1)).toBe(50);
	});
	test('try returns error when failure throws error', async () => {
		const result = Result.try(() => { throw new Error("error"); });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('try returns error when failure throws string', async () => {
		const result = Result.try(() => { throw "error"; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('try returns error when failure throws number', async () => {
		const result = Result.try(() => { throw 4; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("4"));
	});
	test('try returns error when failure throws boolean', async () => {
		const result = Result.try(() => { throw false; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("false"));
	});
	test('tryAsync returns unit when successful', async () => {
		const result = await Result.tryAsync(async () => 50);
		expect(result.isSuccess()).toBeTruthy();
		expect(result.success().valueOrDefault(() => 1)).toBe(50);
	});
	test('tryAsync returns error when failure throws error', async () => {
		const result = await Result.tryAsync(async () => { throw new Error("error"); });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('tryAsync returns error when failure throws string', async () => {
		const result = await Result.tryAsync(async () => { throw "error"; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('tryAsync returns error when failure throws number', async () => {
		const result = await Result.tryAsync(async () => { throw 4; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("4"));
	});
	test('tryAsync returns error when failure throws boolean', async () => {
		const result = await Result.tryAsync(async () => { throw false; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("false"));
	});

	test('tryAction returns unit when successful', async () => {
		const result = Result.tryAction(() => {});
		expect(result.isSuccess()).toBeTruthy();
	});
	test('tryAction returns error when failure throws error', async () => {
		const result = Result.tryAction(() => { throw new Error("error"); });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('tryAction returns error when failure throws string', async () => {
		const result = Result.tryAction(() => { throw "error"; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('tryAction returns error when failure throws number', async () => {
		const result = Result.tryAction(() => { throw 4; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("4"));
	});
	test('tryAction returns error when failure throws boolean', async () => {
		const result = Result.tryAction(() => { throw false; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("false"));
	});
	test('tryActionAsync returns unit when successful', async () => {
		const result = await Result.tryActionAsync(async () => {});
		expect(result.isSuccess()).toBeTruthy();
	});
	test('tryActionAsync returns error when failure throws error', async () => {
		const result = await Result.tryActionAsync(async () => { throw new Error("error"); });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('tryActionAsync returns error when failure throws string', async () => {
		const result = await Result.tryActionAsync(async () => { throw "error"; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("error"));
	});
	test('tryActionAsync returns error when failure throws number', async () => {
		const result = await Result.tryActionAsync(async () => { throw 4; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("4"));
	});
	test('tryActionAsync returns error when failure throws boolean', async () => {
		const result = await Result.tryActionAsync(async () => { throw false; });
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => new Error())).toStrictEqual(new Error("false"));
	});
	test('unit returns unit result', async () => {
		const result = Result.unit<Error>();
		expect(result.isSuccess()).toBeTruthy();
	});
	test('unitAsync returns unit result', async () => {
		const result = await Result.unitAsync<Error>();
		expect(result.isSuccess()).toBeTruthy();
	});
	test('where factory returns unit when true', async () => {
		const result = Result.where<string>(() => true, () => "failure");
		expect(result.isSuccess()).toBeTruthy();
	});
	test('where factory returns failure when false', async () => {
		const result = Result.where<string>(() => false, () => "failure");
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => "")).toBe("failure");
	});
	test('whereAsync factory returns unit when true', async () => {
		const result = await Result.whereAsync<string>(async () => true, async () => "failure");
		expect(result.isSuccess()).toBeTruthy();
	});
	test('whereAsync factory returns failure when false', async () => {
		const result = await Result.whereAsync<string>(async () => false, async  () => "failure");
		expect(result.isSuccess()).toBeFalsy();
		expect(result.failure().valueOrDefault(() => "")).toBe("failure");
	});
});