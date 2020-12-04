# `Option<TValue>` Types

An `Option<TValue>` is an immutable type that can either have `Some` which is a typed value, or `None`. Option types should be used in any scenario where data can be null or empty; unlike nullables, an `Option` forces consuming code to handle the `None` case. Instead of using `null` or `-1` to present an empty id, use `Option<int>` with a value of `None`.

## Creating an `Option<TValue>`

### With a value

```typescript
const some : Option<number>  = OptionFactory.some(100);
const someAsync : Option<number> = await OptionFactory.someAsync(async () => 100);
```

### With no value

```typescript
const none : Option<number> = OptionFactory.none<number>();
const noneAsync : Option<number> = await OptionFactory.noneAsync<number>();
```

### Conditionally

```typescript
const some : Option<number>  = OptionFactory.create(true, () => 100);
const none : Option<number>  = OptionFactory.create(false, () => 100);
const someAsync : Option<number> = await OptionFactory.createAsync(async () => true, async () => 100);
const noneAsync : Option<number> = await OptionFactory.createAsync(async () => false, async () => 100);
const someUnit : Option<Unit> = OptionFactory.where(true);
const noneUnit : Option<Unit> = OptionFactory.where(false);
```

### From a nullable or undefined where null or undefined become `None`

```typescript
const some : Option<number> = OptionFactory.fromNullable<number>(100);
const none : Option<number> = OptionFactory.fromNullable<number>(null);
```

### Option with unit
```typescript
const someUnit : Option<Unit> = OptionFactory.unit();
```

## Working with `Option<TValue>`

### Match

You cannot access the value of an `Option` type directly; instead, you work with them functionally. An `Option` only exposes one function with the following signature:

```typescript
<T>(some: (value: TValue) => T, none: () => T) => T;
```

If the `Option` has a value, then the delegate in the first parameter is invoked and it's result is returned. If the `Option` has no value, then the delegate in the second parameter is invoked instead.

```typescript
// Returns "Has value of 100"
const valueSome : string = OptionFactory.some(100).match(v => `Has value of ${v}`, () => "Has no value");

// Returns "Has no value"
const valueNone : string = OptionFactory.none<number>().match(v => `Has value of ${v}`, () => "Has no value");

// Returns "Has value of 100"
const valueSomeAsync : Promise<string> = OptionFactory.some(100).matchAsync(async v => `Has value of ${v}`, async () => "Has no value");

// Returns "Has no value"
const valueNoneAsync : Promise<string> = OptionFactory.none<number>().matchAsync(async v => `Has value of ${v}`, async () => "Has no value");
```

Working with `match` can be tedious, but there are many extension methods that make using `Option` easy and very powerful.

### ToString

Returns `Some: ${value}` if the option contains some or `None` if the option contains none.

```typescript
// Returns "Some: 100"
const valueSome : string = OptionFactory.some(100).toString();

// Returns "None"
const valueNone : string = OptionFactory.none<number>().toString();
```

### Map

If `Some`, this extension will return an `Option` with the value produced by the delegate parameter, and if `None` it will return `None`.

```typescript
// Returns Option<string> with a value of "100"
const optionSome : Option<string> = OptionFactory.some(100).map(v => `${v}`);

// Returns Option<string> with no value
const optionNone : Option<string> = OptionFactory.none<number>().map(v => `${v}`);
```

### Bind

If `Some`, this extension will return the `Option` returned by the delegate parameter, and if `None` it will return `None`.

```typescript
// Returns Option<string> with a value of "100"
const option1 : Option<string> = OptionFactory.some(100).bind(v => OptionFactory.some(`${v}`));

// Returns Option<string> with no value
const option2 : Option<string> = OptionFactory.some(100).bind(v => OptionFactory.none<string>());

// Returns Option<string> with no value
const option3 : Option<string> = OptionFactory.none<number>().bind(v => OptionFactory.some(`${v}`));

// Returns Option<string> with a value of "100"
const option1Async : OptionPromise<string> = OptionFactory.some(100).bindAsync(v => OptionFactory.someAsync(async () => `${v}`));

// Returns Option<string> with no value
const option2Async : OptionPromise<string> = OptionFactory.some(100).bindAsync(v => OptionFactory.noneAsync<string>());

// Returns Option<string> with no value
const option3Async : OptionPromise<string>  = OptionFactory.none<number>().bindAsync(v => OptionFactory.someAsync(async () => `${v}`));
```

### BindOnNone

If `Some`, this extension will return the original option, and if `None` it will return the `Option` returned by the delegate parameter.

```typescript
// Returns Option<string> with a value of 100
const option1 : Option<number> = OptionFactory.some(100).bindOnNone(() => OptionFactory.some(50));

// Returns Option<string> with a value of 50
const option2 : Option<number> = OptionFactory.none<number>().bindOnNone(() => OptionFactory.some(50));

// Returns Option<string> with a value of 100
const option1Async : OptionPromise<number> = OptionFactory.some(100).bindOnNoneAsync(() => OptionFactory.someAsync(async () => 50));

// Returns Option<string> with a value of 50
const option2Async : OptionPromise<number>  = OptionFactory.none<number>().bindOnNoneAsync(() => OptionFactory.someAsync(async () => 50));
```

### HasValue

If `Some`, this extension will return `true`, and if `None` it will return `false`.

```typescript
// Returns true
const value : boolean = OptionFactory.some(100).hasValue();

// Returns false
const value : boolean = OptionFactory.none<number>().hasValue();
```

### ValueOrDefault

If `Some`, this extension will return the value, and if `None` it will return a specified default.

```typescript
// Returns 100
const value : number = OptionFactory.some(100).valueOrDefault(() => 50);

// Returns 50
const value : number = OptionFactory.none<number>().valueOrDefault(() => 50);
```