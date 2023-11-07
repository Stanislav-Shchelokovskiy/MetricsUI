export default interface FetchResult<T> {
    success: boolean
    data: T
}

export interface Knot {
    id: string
    name: string
}

export interface Payload<StateIdT, DataT> {
    stateId: StateIdT
    data: DataT
}

export interface Token {
    cancel: () => void
}

export interface PopupProps {
    visible: boolean
    onHiding: () => void
}

export interface ComponentProps {
    className: string
}

export interface ValidationResult {
    value: any
    valid: boolean
}

export interface HelpItem {
    title: string
    content: string
}

export const NULL_FILTER_VALUE = '#_NULL_FILTER_VALUE_#'
export type SupportsNullFilter<T> = T | '#_NULL_FILTER_VALUE_#'