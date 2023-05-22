import { FilterParametersNode, FilterParameterNode } from './Interfaces'
import { generateNewSetTitle } from './Utils'

export function getDefaultFilterParametersNode<T>(defaultValue: Array<T> | undefined = undefined): FilterParametersNode<T> | undefined {
    if (defaultValue === undefined)
        return undefined
    return {
        include: true,
        values: defaultValue
    }
}

export function getOptionalDefaultFilterParameterNode<T = string | number>(defaultValue: T | undefined = undefined): FilterParameterNode<T> | undefined {
    if (defaultValue === undefined)
        return undefined
    return getDefaultFilterParameterNode(defaultValue)
}

export function getDefaultFilterParameterNode<T = string | number>(defaultValue: T): FilterParameterNode<T> {
    return {
        include: true,
        value: defaultValue
    }
}

export function getDefaultTitle(): string {
    return generateNewSetTitle([])
}
