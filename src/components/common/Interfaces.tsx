export default interface FetchResult<T> {
    success: boolean
    data: T
}

export interface Tribe {
    id: string
    name: string
}
