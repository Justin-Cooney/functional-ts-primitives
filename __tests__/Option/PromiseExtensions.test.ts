import { Option } from "../../src";

describe('Option Promise Extensions', () => {
	const getOptionAsync = async () => Option.someAsync<number>(async () => 50);

	test('toOptionPromise returns option promise', async () => {
		const result = await getOptionAsync().toOptionPromise().match(success => success / 2, () => -1);
		expect(result).toBe(25);
	});
});