import { Unit, Option, OptionPromise } from "../../src";

describe('OptionFactory Readme', () => {
	test('some', async () => {
		const some : Option<number>  = Option.some(100);
		const someAsync : Option<number> = await Option.someAsync(async () => 100);
	});

	test('none', async () => {
		const none : Option<number> = Option.none<number>();
		const noneAsync : Option<number> = await Option.noneAsync<number>();
	});

	test('conditionally', async () => {
		const some : Option<number>  = Option.create(() => true, () => 100);
		const none : Option<number>  = Option.create(() => false, () => 100);
		const someAsync : Option<number> = await Option.createAsync(async () => true, async () => 100);
		const noneAsync : Option<number> = await Option.createAsync(async () => false, async () => 100);
		const someUnit : Option<Unit> = Option.where(() => true);
		const noneUnit : Option<Unit> = Option.where(() => false);
	});

	test('fromNullable', async () => {
		const some : Option<number> = Option.fromNullable<number>(100);
		const none : Option<number> = Option.fromNullable<number>(null);
	});

	test('unit', async () => {
		const someUnit : Option<Unit> = Option.unit();
	});
});

describe('Option Readme', () => {
	test('tostring', async () => {
		// Returns "Some: 100"
		const valueSome : string = Option.some(100).toString();

		// Returns "None"
		const valueNone : string = Option.none<number>().toString();
	});

	test('match', async () => {
		// Returns "Has value of 100"
		const valueSome : string = Option.some(100).match(v => `Has value of ${v}`, () => "Has no value");

		// Returns "Has no value"
		const valueNone : string = Option.none<number>().match(v => `Has value of ${v}`, () => "Has no value");

		// Returns "Has value of 100"
		const valueSomeAsync : Promise<string> = Option.some(100).matchAsync(async v => `Has value of ${v}`, async () => "Has no value");

		// Returns "Has no value"
		const valueNoneAsync : Promise<string> = Option.none<number>().matchAsync(async v => `Has value of ${v}`, async () => "Has no value");
	});

	test('map', async () => {
		// Returns Option<string> with a value of "100"
		const optionSome : Option<string> = Option.some(100).map(v => `${v}`);

		// Returns Option<string> with no value
		const optionNone : Option<string> = Option.none<number>().map(v => `${v}`);

		// Returns Option<string> with a value of "100"
		const optionSomeAsync : OptionPromise<string> = Option.some(100).mapAsync(async v => `${v}`);

		// Returns Option<string> with no value
		const optionNoneAsync : OptionPromise<string> = Option.none<number>().mapAsync(async v => `${v}`);
	});

	test('bind', async () => {
		// Returns Option<string> with a value of "100"
		const option1 : Option<string> = Option.some(100).bind(v => Option.some(`${v}`));

		// Returns Option<string> with no value
		const option2 : Option<string> = Option.some(100).bind(v => Option.none<string>());

		// Returns Option<string> with no value
		const option3 : Option<string> = Option.none<number>().bind(v => Option.some(`${v}`));

		// Returns Option<string> with a value of "100"
		const option1Async : OptionPromise<string> = Option.some(100).bindAsync(v => Option.someAsync(async () => `${v}`));

		// Returns Option<string> with no value
		const option2Async : OptionPromise<string> = Option.some(100).bindAsync(v => Option.noneAsync<string>());

		// Returns Option<string> with no value
		const option3Async : OptionPromise<string>  = Option.none<number>().bindAsync(v => Option.someAsync(async () => `${v}`));
	});

	test('bindOnNone', async () => {
		// Returns Option<string> with a value of 100
		const option1 : Option<number> = Option.some(100).bindOnNone(() => Option.some(50));

		// Returns Option<string> with a value of 50
		const option2 : Option<number> = Option.none<number>().bindOnNone(() => Option.some(50));

		// Returns Option<string> with a value of 100
		const option1Async : OptionPromise<number> = Option.some(100).bindOnNoneAsync(() => Option.someAsync(async () => 50));

		// Returns Option<string> with a value of 50
		const option2Async : OptionPromise<number>  = Option.none<number>().bindOnNoneAsync(() => Option.someAsync(async () => 50));
	});

	test('hasValue', async () => {
		// Returns true
		const isTrue : boolean = Option.some(100).hasValue();

		// Returns false
		const isFalse : boolean = Option.none<number>().hasValue();
	});

	test('valueOrDefault', async () => {
		// Returns 100
		const value : number = Option.some(100).valueOrDefault(() => 50);

		// Returns 50
		const defaultValue : number = Option.none<number>().valueOrDefault(() => 50);
	});

	test('defaultIfNone', async () => {
		// Returns Option<number> with a value of 100
		const optionWithValue : Option<number> = Option.some(100).defaultIfNone(() => 50);

		// Returns Option<number> with a value of 50
		const optionWithDefault : Option<number> = Option.none<number>().defaultIfNone(() => 50);
	});

	test('toNullable', async () => {
		// Returns 100
		const value : number | null = Option.some(100).toNullable();

		// Returns null
		const nullValue : number | null = Option.none<number>().toNullable();
	});

	test('valueOrUndefined', async () => {
		// Returns 100
		const value : number | undefined = Option.some(100).valueOrUndefined();

		// Returns undefined
		const nullValue : number | undefined = Option.none<number>().valueOrUndefined();
	});

	test('toPromise', async () => {
		// Returns an OptionPromise<number> with a value of 100
		const valuePromise : OptionPromise<number> = Option.some(100).toPromise();

		// Returns an OptionPromise<number> with no value
		const emptyPromise : OptionPromise<number> = Option.none<number>().toPromise();
	});

	test('toResult', async () => {
		// // Returns an Result<number, Error> with a succesful value of 100
		// const succesfulResult : Result<number, Error> = Option.some(100).toResult(() => new Error("message"));

		// // Returns an Result<number, Error> with a failure value of new Error("message")
		// const failureResult : Result<number, Error> = Option.none<number>().toResult(() => new Error("message"));

		// // Returns an ResultPromise<number, Error> with a succesful value of 100
		// const succesfulResultAsync : ResultPromise<number, Error> = Option.some(100).toResultAsync(async () => new Error("message"));

		// // Returns an ResultPromise<number, Error> with a failure value of new Error("message")
		// const failureResultAsync : ResultPromise<number, Error> = Option.none<number>().toResultAsync(async () => new Error("message"));
	});

	test('where', async () => {
		// Returns an Option<number> with a value of 100
		const value1 : Option<number> = Option.some(100).where(() => true);

		// Returns an Option<number> with no value
		const value2 : Option<number> = Option.some(100).where(() => false);

		// Returns an Option<number> with no value
		const value3 : Option<number> = Option.none<number>().where(() => true);

		// Returns an OptionPromise<number> with a value of 100
		const value4 : OptionPromise<number> = Option.some(100).whereAsync(async () => true);

		// Returns an OptionPromise<number> with no value
		const value5 : OptionPromise<number> = Option.some(100).whereAsync(async () => false);

		// Returns an OptionPromise<number> with no value
		const value6 : OptionPromise<number> = Option.none<number>().whereAsync(async () => true);
	});

	test('do', async () => {
		// Logs `Some` and returns an Option<number> with a value of 100
		const value1 : Option<number> = Option.some(100).do(some => console.log("Some"), () => console.log("None"));

		// Logs `None` and returns an Option<number> with no value
		const value2 : Option<number> = Option.none<number>().do(some => console.log("Some"), () => console.log("None"));

		// Logs `Some` and returns an OptionPromise<number> with a value of 100
		const value3 : OptionPromise<number> = Option.some(100).doAsync(async some => console.log("Some"), async () => console.log("None"));
		
		// Logs `None` and returns an OptionPromise<number> with no value
		const value4 : OptionPromise<number> = Option.none<number>().doAsync(async some => console.log("Some"), async () => console.log("None"));
	});

	test('doAlways', async () => {
		// Logs `message` and returns an Option<number> with a value of 100
		const value1 : Option<number> = Option.some(100).doAlways(() => console.log("message"));

		// Logs `message` and returns an Option<number> with no value
		const value2 : Option<number> = Option.none<number>().doAlways(() => console.log("message"));

		// Logs `message` and returns an OptionPromise<number> with a value of 100
		const value3 : OptionPromise<number> = Option.some(100).doAlwaysAsync(async () => console.log("message"));
		
		// Logs `message` and returns an OptionPromise<number> with no value
		const value4 : OptionPromise<number> = Option.none<number>().doAlwaysAsync(async () => console.log("message"));
	});

	test('doIfSome', async () => {
		// Logs `Some` and returns an Option<number> with a value of 100
		const value1 : Option<number> = Option.some(100).doIfSome(some => console.log("Some"));

		// No message is logged and returns an Option<number> with no value
		const value2 : Option<number> = Option.none<number>().doIfSome(some => console.log("Some"));

		// Logs `Some` and returns an OptionPromise<number> with a value of 100
		const value3 : OptionPromise<number> = Option.some(100).doIfSomeAsync(async some => console.log("Some"));
		
		// No message is logged and returns an OptionPromise<number> with no value
		const value4 : OptionPromise<number> = Option.none<number>().doIfSomeAsync(async some => console.log("Some"));
	});

	test('doIfNone', async () => {
		// No message is logged and returns an Option<number> with a value of 100
		const value1 : Option<number> = Option.some(100).doIfNone(() => console.log("None"));

		// Logs `None` and returns an Option<number> with no value
		const value2 : Option<number> = Option.none<number>().doIfNone(() => console.log("None"));

		// No message is logged and returns an OptionPromise<number> with a value of 100
		const value3 : OptionPromise<number> = Option.some(100).doIfNoneAsync(async () => console.log("None"));
		
		// Logs `None` and returns an OptionPromise<number> with no value
		const value4 : OptionPromise<number> = Option.none<number>().doIfNoneAsync(async () => console.log("None"));
	});
	
	test('apply', async () => {
		// Logs `Some`
		Option.some(100).apply(some => console.log("Some"), () => console.log("None"));

		// Logs `None`
		Option.none<number>().apply(some => console.log("Some"), () => console.log("None"));

		// Logs `Some`
		Option.some(100).applyAsync(async some => console.log("Some"), async () => console.log("None"));
		
		// Logs `None`
		Option.none<number>().applyAsync(async some => console.log("Some"), async () => console.log("None"));
	});

	test('applyAlways', async () => {
		// Logs `message`
		Option.some(100).applyAlways(() => console.log("message"));

		// Logs `message`
		Option.none<number>().applyAlways(() => console.log("message"));

		// Logs `message`
		Option.some(100).applyAlwaysAsync(async () => console.log("message"));
		
		// Logs `message`
		Option.none<number>().applyAlwaysAsync(async () => console.log("message"));
	});

	test('applyIfSome', async () => {
		// Logs `Some`
		Option.some(100).applyIfSome(some => console.log("Some"));

		// No message is logged
		Option.none<number>().applyIfSome(some => console.log("Some"));

		// Logs `Some`
		Option.some(100).applyIfSomeAsync(async some => console.log("Some"));
		
		// No message is logged
		Option.none<number>().applyIfSomeAsync(async some => console.log("Some"));
	});

	test('applyIfNone', async () => {
		// No message is logged
		Option.some(100).applyIfNone(() => console.log("None"));

		// Logs `None`
		Option.none<number>().applyIfNone(() => console.log("None"));

		// No message is logged
		Option.some(100).applyIfNoneAsync(async () => console.log("None"));
		
		// Logs `None`
		Option.none<number>().applyIfNoneAsync(async () => console.log("None"));
	});

	test('valueOrEmpty', async () => {
		// Returns [1, 2, 3, 4]
		const arraySome = Option.some([1, 2, 3, 4]).valueOrEmpty();

		// Returns []
		const arrayNone = Option.none<number[]>().valueOrEmpty();
	});

	test('toArray', async () => {
		// Returns [50]
		const arraySome = Option.some(50).toArray();

		// Returns []
		const arrayNone = Option.none<number>().toArray();
	});

	test('throwOnNone', async () => {
		// Returns 50
		const arraySome = Option.some(50).throwOnNone(() => new Error("Some"));

		// Throws error
		const arrayNone = Option.none<number>().toArray();
	});
});