import { URI2HKT } from "./Hkt"

export type URIS = keyof URI2HKT<any>
export type Type<URI extends URIS, A> = URI2HKT<A>[URI]