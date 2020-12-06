import { Type, URIS } from './Helpers';
import { HKT } from './HKT'

export interface Functor<F> {
  map: <A, B>(f: (a: A) => B, fa: HKT<F, A>) => HKT<F, B>
}

export interface Functor1<F extends URIS> {
  map: <A, B>(f: (a: A) => B, fa: Type<F, A>) => Type<F, B>
}