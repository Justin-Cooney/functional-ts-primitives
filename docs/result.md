# `Result<TSuccess, TFailure>` Types

`Result<TSuccess, TFailure>` is an immutable type that can either have a `Success` value (of type `TSuccess`), or a `Failure` value (of type `TFailure`). `Result` types should be used in any scenario where code can produce an error. Results are particularly suitable for expected error cases, but can also be used for all error handling. Results force the handling of failures. Instead of throwing exceptions or returning `null`, return a `Failure` result.

## Creating a `Result<TSuccess, TFailure>` Type

### With a success value

```typescript
// Returns a successful Result with the value of 100
const success : Result<number, string> = Result.success<number, string>(100);

// Returns a successful Result with the value of 100
const successAsync : ResultPromise<number, string> = Result.successAsync<number, string>(async () => 100);
```

### With a failure value

```typescript
// Returns a failure Result with the value of "failure"
const failure : Result<number, string> = Result.failure<number, string>("failure");

// Returns a failure Result with the value of "failure"
const failureAsync : ResultPromise<number, string> = Result.failureAsync<number, string>(async () => "failure");
```

### Conditionally

```typescript
// Returns a successful Result with the value of 100
const success : Result<number, string> = Result.create<number, string>(() => true, () => 100, () => "failure");

// Returns a failure Result with the value of "failure"
const failure : Result<number, string> = Result.create<number, string>(() => false, () => 100, () => "failure");

// Returns a successful Result with the value of 100
const successAsync : ResultPromise<number, string> = Result.createAsync<number, string>(async () => true, async () => 100, async () => "failure");

// Returns a failure Result with the value of "failure"
const failureAsync : ResultPromise<number, string> = Result.createAsync<number, string>(async () => false, async () => 100, async () => "failure");

// Returns a successful Result with the value of Unit
const whereSuccess : Result<Unit, Error> = Result.where(() => true, () => new Error("failure"));

// Returns a failure Result with an error value
const whereFailure : Result<Unit, Error> = Result.where(() => false, () => new Error("failure"));

// Returns a successful Result with the value of Unit
const whereSuccessAsync : ResultPromise<Unit, Error> = Result.whereAsync(async () => true, async () => new Error("failure"));

// Returns a failure Result with an error value
const whereFailureAsync : ResultPromise<Unit, Error> = Result.whereAsync(async () => false, async () => new Error("failure"));
```

### With exception handling

```typescript
// Returns a successful Result with the value of 100
const success : Result<number, Error> = Result.try<number>(() => 100);

// Returns a failure Result with an error value
const failure : Result<number, Error> = Result.try<number>(() => { throw new Error("Error"); });

// Returns a successful Result with the value of 100
const successAsync : ResultPromise<number, Error> = Result.tryAsync<number>(async () => 100);

// Returns a failure Result with an error value
const failureAsync : ResultPromise<number, Error> = Result.tryAsync<number>(async () => { throw new Error("Error"); });
```

### With Unit

```typescript
// Returns a successful Result with the value of Unit
const success : Result<Unit, Error> = Result.unit<Error>();

// Returns a successful Result with the value of Unit
const successAsync : ResultPromise<Unit, Error> = Result.unitAsync<Error>();
```

## Working with `ResultPromise<TValue>`

For working asynchronously a separate `ResultPromise<TSuccess, TFailure>` type is provided. Use this type in the place of `Promise<Result<TSuccess, TFailure>>` to take advantage of the many extension functions provided.

## Working with `Result<TSuccess, TFailure>`

### match

You cannot access the value of a `Result` type directly; instead, you work with them functionally. A `Result` is not composed of data, but is instead composed of function with the following signature.

```typescript
<T>(success: (success: TSuccess) => T, failure: (failure: TFailure) => T) => T;
```

If the `Result` has a successful value, then the delegate in the first parameter is invoked and it's result is returned. If the `Result` has a failure value, then the delegate in the second parameter is invoked instead.

```typescript
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
```

Working with `match` can be tedious, but there are many additional functions that build upon the match function and make using `Option` easy and very powerful.

### toString

Returns `Success: ${success}` if the Result contains a successful value or `Failure ${failure}` if the Result contains a failure value.

```typescript
// Returns "Success: 100"
const valueSuccess : string = Result.success<number, string>(100).toString();

// Returns "Failure: Failure"
const valueFailure : string = Result.failure<number, string>("Failure").toString();
```

### isSuccess

If the Result has a successful value, this extension will return `true`. If the Result has a failure value then it will return `false`.

```typescript
// Returns true
const valueSuccess : boolean = Result.success<number, string>(100).isSuccess();

// Returns false
const valueFailure : boolean = Result.failure<number, string>("Failure").isSuccess();
```

### toPromise

Returns the Result as a ResultPromise.

```typescript
// Returns a ResultPromise<number, string> with a success value of 100
const valueSuccess : ResultPromise<number, string> = Result.success<number, string>(100).toPromise();

// Returns a ResultPromise<number, string> with a failure value of "Failure"
const valueFailure : ResultPromise<number, string> = Result.failure<number, string>("Failure").toPromise();
```

### success

If the Result has a success value, returns an Option with the success value. If the Result has a failure value then returns an empty Option.

```typescript
// Returns a Option<number> with a value of 100
const valueSuccess : Option<number> = Result.success<number, string>(100).success();

// Returns a Option<number> with no value
const valueFailure : Option<number> = Result.failure<number, string>("Failure").success();
```

### failure

If the Result has a success value, returns an Option with no value. If the Result has a failure value then returns an Option with the failure value.

```typescript
// Returns a Option<number> with no value
const valueSuccess : Option<string> = Result.success<number, string>(100).failure();

// Returns a Option<number> with a value of "Failure"
const valueFailure : Option<string> = Result.failure<number, string>("Failure").failure();
```

### map

If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.

```typescript
// Returns a Result<number, string> with a success value of 50
const valueSuccess : Result<number, string> = Result.success<number, string>(100).map(success => success / 2);

// Returns a Result<number, string> with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").map(success => success / 2);

// Returns a ResultPromise<number, string> with a success value of 50
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).mapAsync(async success => success / 2);

// Returns a ResultPromise<number, string> with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").mapAsync(async success => success / 2);
```

### mapFailure

If the Result has a success value, returns a new `Result<TSuccess, TMapFailure>` with the success value. If the Result has a failure value, returns a `Result<TSuccess, TMapFailure>` with the result generated by the function passed in as the first argument.

```typescript
// Returns a Result<number, string> with a success value of 100
const valueSuccess : Result<number, string> = Result.success<number, string>(100).mapFailure(failure => `New ${failure}`);

// Returns a Result<number, string> with a failure value of "New Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").mapFailure(failure => `New ${failure}`);

// Returns a ResultPromise<number, string> with a success value of 100
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).mapFailureAsync(async failure => `New ${failure}`);

// Returns a ResultPromise<number, string> with a failure value of "New Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").mapFailureAsync(async failure => `New ${failure}`);
```

### tryMap

If the Result has a success value, returns a new `Result<TResult, TFailure>` with the result generated by the function passed in as the first argument. If the function throws an error the error will be mapped to a failure value by the funciton passed in as the second argument. If the Result contains a failure value returns a new result with the failure value.

```typescript
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
```

### bind

If the Result has a success value, returns the `Result<TResult, TFailure>` generated by the bind function passed in the first parameter. If the Result has a failure value, returns a `Result<TResult, TFailure>` with the failure value.

```typescript
// Returns a Result with a success value of 50
const valueSuccess : Result<number, string> = Result.success<number, string>(100).bind(success => Result.success(success / 2));

// Returns a Result with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").bind(success => Result.success(success / 2));

// Returns a Result with a success value of 50
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).bindAsync(async success => Result.success(success / 2));

// Returns a Result with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").bindAsync(async success => Result.success(success / 2));
```

### bindOnFailure

If the Result has a success value, returns a `Result<TSuccess, TResult>` If the Result has a failure value, returns a `Result<TSuccess, TResult>` generated by the bind function passed in the first parameter. 

```typescript
// Returns a Result with a success value of 100
const valueSuccess : Result<number, string> = Result.success<number, string>(100).bindOnFailure(failure => Result.failure(`New ${failure}`));

// Returns a Result with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").bindOnFailure(failure => Result.failure(`New ${failure}`));

// Returns a ResultPromise with a success value of 100
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).bindOnFailureAsync(async failure => Result.failure(`New ${failure}`));

// Returns a ResultPromise with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").bindOnFailureAsync(async failure => Result.failure(`New ${failure}`));
```

### where

If the Result has a success value and the predicate function is true, returns a Result with the original success value. If the Result has a success value and the predicate function is false, returns a result with the failure generated by the function passed into the second parameter. Otherwise, returns a Result with the original failure value.

```typescript
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
```

### do

If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter. The original Result is always returned.

```typescript
// Logs `Some` and returns an Result with a success value of 100
const valueSuccess : Result<number, string> = Result.success<number, string>(100).do(success => console.log("Success"), failure => console.log("Failure"));

// Logs `Failure` and returns an Result with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").do(success => console.log("Success"), failure => console.log("Failure"));

// Logs `Some` and returns an ResultPromise with a success value of 100
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doAsync(async success => console.log("Success"), async failure => console.log("Failure"));

// Logs `Failure` and returns an ResultPromise with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doAsync(async success => console.log("Success"), async failure => console.log("Failure"));
```

### doAlways

Performs the function provided as the first parameter and returns the original Result.

```typescript
// Logs `message` and returns an Result with a success value of 100
const valueSuccess : Result<number, string> = Result.success<number, string>(100).doAlways(() => console.log("message"));

// Logs `message` and returns an Result with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").doAlways(() => console.log("message"));

// Logs `message` and returns an ResultPromise with a success value of 100
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doAlwaysAsync(async () => console.log("message"));

// Logs `message` and returns an ResultPromise with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doAlwaysAsync(async () => console.log("message"));
```

### doIfSuccessful

If the Result has a success value, performs the function provided as the first parameter. The original Result is always returned.

```typescript
// Logs `Success` and returns an Result with a success value of 100
const valueSuccess : Result<number, string> = Result.success<number, string>(100).doIfSuccessful(success => console.log("Success"));

// Logs nothing and returns an Result with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").doIfSuccessful(success => console.log("Success"));

// Logs `Success` and returns an ResultPromise with a success value of 100
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doIfSuccessfulAsync(async success => console.log("Success"));

// Logs nothing and returns an ResultPromise with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doIfSuccessfulAsync(async success => console.log("Success"));
```

### doIfFailure

If the Result has a failure value, performs the function provided as the first parameter. The original Result is always returned.

```typescript
// Logs nothing and returns an Result with a success value of 100
const valueSuccess : Result<number, string> = Result.success<number, string>(100).doIfFailure(failure => console.log("Failure"));

// Logs `Failure` and returns an Result with a failure value of "Failure"
const valueFailure : Result<number, string> = Result.failure<number, string>("Failure").doIfFailure(failure => console.log("Failure"));

// Logs nothing and returns an ResultPromise with a success value of 100
const valueSuccessAsync : ResultPromise<number, string> = Result.success<number, string>(100).doIfFailureAsync(async failure => console.log("Failure"));

// Logs `Failure` and returns an ResultPromise with a failure value of "Failure"
const valueFailureAsync : ResultPromise<number, string> = Result.failure<number, string>("Failure").doIfFailureAsync(async failure => console.log("Failure"));
```

### apply

If the Result has a success value, performs the function provided as the first parameter. If the Result has a failure value, performs the function provided as the second parameter.

```typescript
// Logs `Some`
Result.success<number, string>(100).apply(success => console.log("Success"), failure => console.log("Failure"));

// Logs `Failure`
Result.failure<number, string>("Failure").apply(success => console.log("Success"), failure => console.log("Failure"));

// Logs `Some`
Result.success<number, string>(100).applyAsync(async success => console.log("Success"), async failure => console.log("Failure"));

// Logs `Failure`
Result.failure<number, string>("Failure").applyAsync(async success => console.log("Success"), async failure => console.log("Failure"));
```

### applyAlways

Performs the function provided as the first parameter.

```typescript
// Logs `message`
Result.success<number, string>(100).applyAlways(() => console.log("message"));

// Logs `message`
Result.failure<number, string>("Failure").applyAlways(() => console.log("message"));

// Logs `message`
Result.success<number, string>(100).applyAlwaysAsync(async () => console.log("message"));

// Logs `message`
Result.failure<number, string>("Failure").applyAlwaysAsync(async () => console.log("message"));
```

### applyIfSuccessful

If the Result has a success value, performs the function provided as the first parameter.

```typescript
// Logs `Success`
Result.success<number, string>(100).applyIfSuccessful(success => console.log("Success"));

// Logs nothing
Result.failure<number, string>("Failure").applyIfSuccessful(success => console.log("Success"));

// Logs `Success`
Result.success<number, string>(100).applyIfSuccessfulAsync(async success => console.log("Success"));

// Logs nothing
Result.failure<number, string>("Failure").applyIfSuccessfulAsync(async success => console.log("Success"));
```

### applyIfFailure

If the Result has a failure value, performs the function provided as the first parameter.

```typescript
// Logs nothing
Result.success<number, string>(100).applyIfFailure(failure => console.log("Failure"));

// Logs `Failure`
Result.failure<number, string>("Failure").applyIfFailure(failure => console.log("Failure"));

// Logs nothing
Result.success<number, string>(100).applyIfFailureAsync(async failure => console.log("Failure"));

// Logs `Failure`
Result.failure<number, string>("Failure").applyIfFailureAsync(async failure => console.log("Failure"));
```