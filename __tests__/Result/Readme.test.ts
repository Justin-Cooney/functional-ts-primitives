import { Result, ResultPromise, Unit, Option } from "../../src";

describe('Result Readme', () => {
	test('success', async () => {
		// Returns a successful Result with the value of 100
		const success : Result<number, string> = Result.success<number, string>(100);

		// Returns a successful Result with the value of 100
		const successAsync : ResultPromise<number, string> = Result.successAsync<number, string>(async () => 100);
	});

	test('failure', async () => {
		// Returns a failure Result with the value of "failure"
		const failure : Result<number, string> = Result.failure<number, string>("failure");

		// Returns a failure Result with the value of "failure"
		const failureAsync : ResultPromise<number, string> = Result.failureAsync<number, string>(async () => "failure");
	});

	test('conditionally', async () => {
		// Returns a successful Result with the value of 100
		const success : Result<number, string> = Result.create<number, string>(() => true, () => 100, () => "failure");

		// Returns a failure Result with the value of "failure"
		const failure : Result<number, string> = Result.create<number, string>(() => false, () => 100, () => "failure");

		// Returns a successful Result with the value of 100
		const successAsync : ResultPromise<number, string> = Result.createAsync<number, string>(async () => true, async () => 100, async () => "failure");

		// Returns a failure Result with the value of "failure"
		const failureAsync : ResultPromise<number, string> = Result.createAsync<number, string>(async () => false, async () => 100, async () => "failure");
	});

	test('try', async () => {
		// Returns a successful Result with the value of 100
		const success : Result<number, Error> = Result.try<number>(() => 100);

		// Returns a failure Result with an error value
		const failure : Result<number, Error> = Result.try<number>(() => { throw new Error("Error"); });

		// Returns a successful Result with the value of 100
		const successAsync : ResultPromise<number, Error> = Result.tryAsync<number>(async () => 100);

		// Returns a failure Result with an error value
		const failureAsync : ResultPromise<number, Error> = Result.tryAsync<number>(async () => { throw new Error("Error"); });
	});

	test('unit', async () => {
		// Returns a successful Result with the value of Unit
		const success : Result<Unit, Error> = Result.unit<Error>();

		// Returns a successful Result with the value of Unit
		const successAsync : ResultPromise<Unit, Error> = Result.unitAsync<Error>();

		// Returns a successful Result with the value of Unit
		const whereSuccess : Result<Unit, Error> = Result.where(() => true, () => new Error("failure"));

		// Returns a failure Result with an error value
		const whereFailure : Result<Unit, Error> = Result.where(() => false, () => new Error("failure"));

		// Returns a successful Result with the value of Unit
		const whereSuccessAsync : ResultPromise<Unit, Error> = Result.whereAsync(async () => true, async () => new Error("failure"));

		// Returns a failure Result with an error value
		const whereFailureAsync : ResultPromise<Unit, Error> = Result.whereAsync(async () => false, async () => new Error("failure"));
	});
});

describe('Result Readme', () => {
	test('match', async () => {
		// Returns "Has success value of 100"
		const valueSuccess : string = Result.success<number, string>(100).match(
			success => `Has success value of ${success}`,
			failure => `Has failure value of ${failure}`);

		// Returns "Has failure value of Failure"
		const valueFailure : string = Result.failure<number, string>("Failure").match(
			success => `Has success value of ${success}`,
			failure => `Has failure value of ${failure}`);

		// Returns "Has success value of 100"
		const valueSuccessAsync : string = await Result.successAsync<number, string>(async () => 100).match(
			success => `Has success value of ${success}`,
			failure => `Has failure value of ${failure}`);

		// Returns "Has failure value of Failure"
		const valueFailureAsync : string = await Result.failureAsync<number, string>(async () => "Failure").match(
			success => `Has success value of ${success}`,
			failure => `Has failure value of ${failure}`);
	});

	test('toString', async () => {
		// Returns "Success: 100"
		const valueSuccess : string = Result.success<number, string>(100).toString();

		// Returns "Failure: Failure"
		const valueFailure : string = Result.failure<number, string>("Failure").toString();

		// Returns "Success: 100"
		const valueSuccessAsync : string = await Result.successAsync<number, string>(async () => 100).toString();

		// Returns "Failure: Failure"
		const valueFailureAsync : string = await Result.failureAsync<number, string>(async () => "Failure").toString();
	});

	test('isSuccess', async () => {
		// Returns true
		const valueSuccess : boolean = Result.success<number, string>(100).isSuccess();

		// Returns false
		const valueFailure : boolean = Result.failure<number, string>("Failure").isSuccess();
	});

	test('toPromise', async () => {
		// Returns a ResultPromise<number, string> with a success value of 100
		const valueSuccess : ResultPromise<number, string> = Result.success<number, string>(100).toPromise();

		// Returns a ResultPromise<number, string> with a failure value of "Failure"
		const valueFailure : ResultPromise<number, string> = Result.failure<number, string>("Failure").toPromise();
	});

	test('success', async () => {
		// Returns a Option<number> with a value of 100
		const valueSuccess : Option<number> = Result.success<number, string>(100).success();

		// Returns a Option<number> with no value
		const valueFailure : Option<number> = Result.failure<number, string>("Failure").success();
	});

	test('failure', async () => {
		// Returns a Option<number> with no value
		const valueSuccess : Option<string> = Result.success<number, string>(100).failure();

		// Returns a Option<number> with a value of "Failure"
		const valueFailure : Option<string> = Result.failure<number, string>("Failure").failure();
	});

	test('map', async () => {
		// Returns a Result with a success value of 50
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).map(success => success / 2);

		// Returns a Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").map(success => success / 2);

		// Returns a ResultPromise with a success value of 50
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).mapAsync(async success => success / 2);

		// Returns a ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").mapAsync(async success => success / 2);
	});

	test('mapFailure', async () => {
		// Returns a Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).mapFailure(failure => `New ${failure}`);

		// Returns a Result with a failure value of "New Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").mapFailure(failure => `New ${failure}`);

		// Returns a ResultPromisewith a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).mapFailureAsync(async failure => `New ${failure}`);

		// Returns a ResultPromise with a failure value of "New Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").mapFailureAsync(async failure => `New ${failure}`);
	});

	test('tryMap', async () => {
		// Returns a Result with a success value of 50
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).tryMap(success => success / 2, error => error.message);

		// Returns a Result with a failure value of "Some Error"
		const valueError : Result<number, string> = Result.success<number, string>(100).tryMap(success => { throw new Error("Some Error"); }, error => error.message);

		// Returns a Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").tryMap(success => success / 2, error => error.message);

		// Returns a ResultPromise with a success value of 50
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).tryMapAsync(async success => success / 2, async error => error.message);

		// Returns a ResultPromise with a failure value of "Some Error"
		const valueErrorAsync : ResultPromise<number, string> = Result.success<number, string>(100).tryMapAsync(async success => { throw new Error("Some Error"); }, async error => error.message);

		// Returns a ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").tryMapAsync(async success => success / 2, async error => error.message);
	});

	test('bind', async () => {
		// Returns a Result with a success value of 50
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).bind(success => Result.success(success / 2));

		// Returns a Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").bind(success => Result.success(success / 2));

		// Returns a ResultPromise with a success value of 50
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).bindAsync(async success => Result.success(success / 2));

		// Returns a ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").bindAsync(async success => Result.success(success / 2));
	});

	test('bindOnFailure', async () => {
		// Returns a Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).bindOnFailure(failure => Result.failure(`New ${failure}`));

		// Returns a Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").bindOnFailure(failure => Result.failure(`New ${failure}`));

		// Returns a ResultPromise with a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).bindOnFailureAsync(async failure => Result.failure(`New ${failure}`));

		// Returns a ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").bindOnFailureAsync(async failure => Result.failure(`New ${failure}`));
	});

	test('where', async () => {
		// Returns a Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).where(success => true, success => `Failed ${success}`);

		// Returns a Result with a failure value of "Failed 100"
		const valueFailed : Result<number, string> = Result.success<number, string>(100).where(success => false, success => `Failed ${success}`);

		// Returns a Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").where(success => true, success => `Failed ${success}`);

		// Returns a ResultPromise with a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).whereAsync(async success => true, async success => `Failed ${success}`);

		// Returns a ResultPromise with a failure value of "Failed 100"
		const valueFailedAsync : ResultPromise<number, string> = Result.success<number, string>(100).whereAsync(async success => false, async success => `Failed ${success}`);

		// Returns a ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").whereAsync(async success => true, async success => `Failed ${success}`);
	});

	test('do', async () => {
		// Logs `Some` and returns an Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).do(success => console.log("Success"), failure => console.log("Failure"));

		// Logs `Failure` and returns an Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").do(success => console.log("Success"), failure => console.log("Failure"));

		// Logs `Some` and returns an ResultPromise with a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doAsync(async success => console.log("Success"), async failure => console.log("Failure"));

		// Logs `Failure` and returns an ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doAsync(async success => console.log("Success"), async failure => console.log("Failure"));
	});

	test('doAlways', async () => {
		// Logs `message` and returns an Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).doAlways(() => console.log("message"));

		// Logs `message` and returns an Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").doAlways(() => console.log("message"));

		// Logs `message` and returns an ResultPromise with a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doAlwaysAsync(async () => console.log("message"));

		// Logs `message` and returns an ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doAlwaysAsync(async () => console.log("message"));
	});

	test('doIfSuccessful', async () => {
		// Logs `Success` and returns an Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).doIfSuccessful(success => console.log("Success"));

		// Logs nothing and returns an Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").doIfSuccessful(success => console.log("Success"));

		// Logs `Success` and returns an ResultPromise with a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doIfSuccessfulAsync(async success => console.log("Success"));

		// Logs nothing and returns an ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doIfSuccessfulAsync(async success => console.log("Success"));
	});

	test('doIfFailure', async () => {
		// Logs nothing and returns an Result with a success value of 100
		const valueSuccess : Result<number, string> = Result.success<number, string>(100).doIfFailure(failure => console.log("Failure"));

		// Logs `Failure` and returns an Result with a failure value of "Failure"
		const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").doIfFailure(failure => console.log("Failure"));

		// Logs nothing and returns an ResultPromise with a success value of 100
		const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doIfFailureAsync(async failure => console.log("Failure"));

		// Logs `Failure` and returns an ResultPromise with a failure value of "Failure"
		const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doIfFailureAsync(async failure => console.log("Failure"));
	});

	test('apply', async () => {
		// Logs `Some`
		Result.success<number, string>(100).apply(success => console.log("Success"), failure => console.log("Failure"));

		// Logs `Failure`
		Result.failure<number, string>("Failure").apply(success => console.log("Success"), failure => console.log("Failure"));

		// Logs `Some`
		Result.success<number, string>(100).applyAsync(async success => console.log("Success"), async failure => console.log("Failure"));

		// Logs `Failure`
		Result.failure<number, string>("Failure").applyAsync(async success => console.log("Success"), async failure => console.log("Failure"));
	});
	
	test('applyAlways', async () => {
		// Logs `message`
		Result.success<number, string>(100).applyAlways(() => console.log("message"));

		// Logs `message`
		Result.failure<number, string>("Failure").applyAlways(() => console.log("message"));

		// Logs `message`
		Result.success<number, string>(100).applyAlwaysAsync(async () => console.log("message"));

		// Logs `message`
		Result.failure<number, string>("Failure").applyAlwaysAsync(async () => console.log("message"));
	});

	test('applyIfSuccessful', async () => {
		// Logs `Success`
		Result.success<number, string>(100).applyIfSuccessful(success => console.log("Success"));

		// Logs nothing
		Result.failure<number, string>("Failure").applyIfSuccessful(success => console.log("Success"));

		// Logs `Success`
		Result.success<number, string>(100).applyIfSuccessfulAsync(async success => console.log("Success"));

		// Logs nothing
		Result.failure<number, string>("Failure").applyIfSuccessfulAsync(async success => console.log("Success"));
	});

	test('applyIfFailure', async () => {
		// Logs nothing
		Result.success<number, string>(100).applyIfFailure(failure => console.log("Failure"));

		// Logs `Failure`
		Result.failure<number, string>("Failure").applyIfFailure(failure => console.log("Failure"));

		// Logs nothing
		Result.success<number, string>(100).applyIfFailureAsync(async failure => console.log("Failure"));

		// Logs `Failure`
		Result.failure<number, string>("Failure").applyIfFailureAsync(async failure => console.log("Failure"));
	});
});