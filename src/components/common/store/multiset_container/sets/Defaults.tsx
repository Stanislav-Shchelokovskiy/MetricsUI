import { FilterParameters, FilterParameter, Undefinable } from './Interfaces'
import { generateSetTitle } from '../Utils'
import { BaseSetState } from './Interfaces'
import { SupportsNullFilter } from '../../../Typing'

export function getOptionalFilterParameters<T>(defaultValue: Array<T> | undefined = undefined): Undefinable<FilterParameters<T>> {
    if (defaultValue === undefined)
        return undefined
    return getFilterParameters(defaultValue)
}

export function getFilterParameters<T>(defaultValue: Array<T>): FilterParameters<T> {
    return {
        include: true,
        values: defaultValue
    }
}

export function getOptionalFilterParameter<T = string | number>(defaultValue: T | undefined = undefined): Undefinable<FilterParameter<T>> {
    if (defaultValue === undefined)
        return undefined
    return getFilterParameter(defaultValue)
}

export function getFilterParameter<T = string | number>(defaultValue: T): FilterParameter<T> {
    return {
        include: true,
        value: defaultValue
    }
}

export function getDefaultTitle(): string {
    return generateSetTitle([])
}

export function getDefaultBaseSet(): BaseSetState {
    return {
        title: getDefaultTitle(),
        tribes: getOptionalFilterParameters<string>(),
        tents: getOptionalFilterParameters<string>(),
        empTribes: getOptionalFilterParameters<string>(),
        empTents: getOptionalFilterParameters<string>(),
        positions: getOptionalFilterParameters<string>(),
        levels: getOptionalFilterParameters<SupportsNullFilter<number>>(),
        employees: getOptionalFilterParameters<string>(),
    }
}
