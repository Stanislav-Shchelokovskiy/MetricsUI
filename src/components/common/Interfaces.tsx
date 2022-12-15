export default interface FetchResult<T> {
    success: boolean
    data: T
}

export interface Tribe {
    id: string
    name: string
}

export interface Payload<StateIdT, DataT> {
    stateId: StateIdT
    data: DataT
}

export interface Token {
    cancel: (() => void) | undefined
}