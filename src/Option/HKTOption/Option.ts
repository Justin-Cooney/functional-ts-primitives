import { OptionFactory, OptionPromise } from ".."

export const URI = 'Option'

export type URI = typeof URI

export class Some<A> {
  readonly _URI!: URI
  readonly _A!: A
  static readonly tag: 'Some' = 'Some'
  constructor(readonly value: A) {}
  static readonly hasValue = true;

  match<B>(onSome: (a: A) => B, onNone: () => B): B { return onSome(this.value) }
  matchAsync<B>(onSome: (a: A) => B, onNone: () => B): Promise<B> { return Promise.resolve(onSome(this.value)) }
  valueOrDefault(defaultValue: A): A { return this.value}
  valueOrDefaultAsync(defaultValue: A): Promise<A> { return Promise.resolve(this.value) }
  defaultIfNone(defaultValue: A) : Option<A> { return this}
	defaultIfNoneAsync(defaultValue: A): Promise<Option<A>> { return Promise.resolve(this) }
  toNullable(): A | null { return this.value }
  
	// toResult: Extensions.toResult(match),
	// toResultAsync: Extensions.toResultAsync(match),
  // toPromise: Extensions.toPromise(match),

  map<B>(onSome: (a: A) => B): Option<B>{ return some(onSome(this.value)) }
	mapAsync<B>(onSome: (a: A) => B): Promise<B> { return Promise.resolve(onSome(this.value)) }
  bind<B>(onSome: (a: A) => Option<B>): Option<B> { return onSome(this.value) }
  where(predicate: (some: A) => boolean): Option<A> { return predicate(this.value) ? this : none }
  whereAsync(predicate: (some: A) => boolean): Promise<Option<A>> { return predicate(this.value) ? Promise.resolve(this) : Promise.resolve(none) }
  do(onSome: (a: A) => void, onNone: () => void): void { return onSome(this.value) }
  doAsync(onSome: (a: A) => void, onNone: () => void): Promise<void> { return Promise.resolve(onSome(this.value)) }
  doAlways(doAction: (a: A) => void): void { return doAction(this.value) }
  doAlwaysAsync(doAction: (a: A) => Promise<void>): Promise<void> { return Promise.resolve(doAction(this.value)) }
  doIfSome(onSome: (a: A) => void): void { return onSome(this.value) }
  doIfSomeAsync(onSome: (a: A) => Promise<void>): Promise<void> { return Promise.resolve(onSome(this.value)) }
  doIfNone(onNone: (a: A) => void): void { }
  doIfNoneAsync(onNone: (a: A) => void): Promise<void> { return new Promise(resolve => resolve()) }
  apply(onSome: (a: A) => void, onNone: () => void): Option<A> { onSome(this.value); return this; }
  async applyAsync(onSome: (a: A) => Promise<void>, onNone: () => Promise<void>): Promise<Option<A>> { await onSome(this.value); return Promise.resolve(this) }
	applyAlways(doAction: () => void): Option<A> { doAction(); return this; }
	async asyncapplyAlwaysAsync(doAction: (a: A) => Promise<void>): Promise<Option<A>> { await doAction(this.value); return Promise.resolve(this) }
  applyIfSome(onSome: (a: A) => void): Option<A> { onSome(this.value); return this }
  async applyIfSomeAsync(onSome: (a: A) => Promise<void>): Promise<Option<A>> { await onSome(this.value); return Promise.resolve(this) }
  applyIfNone(onNone: () => void): Option<A> { return this }
  async applyIfNoneAsync(onNone: () => Promise<void>): Promise<Option<A>> { return Promise.resolve(this) }
  
  toString() { return  `Some: ${this.value}` };
}

export class None<A> {
  readonly _URI!: URI
  readonly _A!: never
  static readonly tag: 'None' = 'None'
  static readonly hasValue = false;

  match<B>(onSome: (a: A) => B, onNone: () => B): B { return onNone() }
  matchAsync<B>(onSome: (a: A) => B, onNone: () => B): Promise<B> { return Promise.resolve(onNone()) }
  valueOrDefault(defaultValue: A) { return defaultValue}
  valueOrDefaultAsync(defaultValue: A) { return Promise.resolve(defaultValue);}
  defaultIfNone(defaultValue: A): Option<A> { return some(defaultValue)}
  defaultIfNoneAsync(defaultValue: A):Promise<Option<A>> { return Promise.resolve(some(defaultValue)) }
	toNullable(): A | null { return null }
  
  //toResult: Extensions.toResult(match),
  //toResultAsync: Extensions.toResultAsync(match),
  //toPromise: Extensions.toPromise(match),
  
  map<B>(onSome: (a: A) => B): Option<B> { return none }
  mapAsync<B>(onSome: (a: A) => B): OptionPromise<B> { return OptionFactory.noneAsync<B>() }
  bind<B>(onSome: (a: A) => Option<B>): Option<B> { return none }
  where(predicate: (some: A) => boolean): Option<A> { return none }
  whereAsync(predicate: (some: A) => boolean): Promise<Option<A>> { return Promise.resolve(none) }
  do(onSome: (a: A) => void, onNone: () => void): void { return onNone() }
  doIfSome(onSome: (a: A) => void, onNone: () => void): void { return onNone() }
  doAsync(onSome: (a: A) => void, onNone: () => void): Promise<void> { return Promise.resolve() }
  doAlways(doAction: (a: A) => void): void { }
  doAlwaysAsync(doAction: (a: A) => Promise<void>): Promise<void> { return Promise.resolve() }
  doIfSomeAsync(onSome: (a: A) => Promise<void>): Promise<void> { return Promise.resolve() }
  doIfNone(onNone: () => void): void { onNone() }
  doIfNoneAsync(onNone: (a: A) => void): Promise<void> { return Promise.resolve() }
  apply(onSome: (a: A) => void, onNone: () => void): Option<A> { onNone(); return this; }
  async applyAsync(onSome: (a: A) => Promise<void>, onNone: () => Promise<void>): Promise<Option<A>> { await onNone(); return Promise.resolve(this); }
	applyAlways(doAction: () => void): Option<A> { doAction(); return this; }
	async asyncapplyAlwaysAsync(doAction: () => Promise<void>): Promise<Option<A>> { await doAction(); return Promise.resolve(this); }
  applyIfSome(onSome: (a: A) => void): Option<A> { return this; }
  async applyIfSomeAsync(onSome: (a: A) => Promise<void>): Promise<Option<A>> { return Promise.resolve(this); }
  applyIfNone(onNone: (a: A) => void): Option<A> { onNone; return this; }
  async applyIfNoneAsync(onNone: () => Promise<void>): Promise<Option<A>> { await onNone(); return Promise.resolve(this); }

  static readonly toString = () =>  `None`;
}

export const some = <A>(a: A): Option<A> => new Some(a)

export const none: Option<never> = new None()

export type Option<A> = Some<A> | None<A> 

declare module './HKT' {
  interface URI2HKT<A> {
    Option: Option<A>
  }
}