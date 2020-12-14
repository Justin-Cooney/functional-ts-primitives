import { Result } from "../../src";

describe('Result Promise Extensions', () => {
	const getResultAsync = async () => Result.successAsync<number, string>(async () => 50);

	test('toResultPromise returns result promise', async () => {
		const result = await getResultAsync().toResultPromise().match(success => success / 2, error => -1);
		expect(result).toBe(25);
	});

	test('toResultPromise returns result promise', async () => {
		const result = await getResultAsync().toResultPromise().match(success => success / 2, error => -1);

		expect(result).toBe(25);
	});
});