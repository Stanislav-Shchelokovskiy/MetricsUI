import { SupportsNullFilter } from '../../../Typing'

interface Filter {
    include: boolean
}

export interface FilterParameters<T> extends Filter {
    values: Array<T>
}

export interface FilterParameter<T> extends Filter {
    value: T
}

export type Undefinable<T> = T | undefined

//  multiples
export type StringFilterParameters = Undefinable<FilterParameters<SupportsNullFilter<string>>>
export type NumberFilterParameters = Undefinable<FilterParameters<SupportsNullFilter<number>>>
export type StrictNumberFilterParameters = Undefinable<FilterParameters<number>>
export type RequiredNmberilterParameters = FilterParameters<SupportsNullFilter<number>>

//  singles
export type RequiredNumberFilterParameter = FilterParameter<number>
export type NumberFilterParameter = Undefinable<FilterParameter<number>>
export type BooleanFilterParameter = Undefinable<FilterParameter<Boolean>>

export interface BaseSetState {
    title: string
    tribes: StringFilterParameters
    tents: StringFilterParameters
    empTribes: StringFilterParameters
    empTents: StringFilterParameters
    positions: StringFilterParameters
    levels: NumberFilterParameters
    employees: StringFilterParameters
}
